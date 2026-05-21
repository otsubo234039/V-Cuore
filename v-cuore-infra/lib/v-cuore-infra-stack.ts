import { CfnOutput, RemovalPolicy, Stack, type StackProps, Duration } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import * as fs from 'fs';

export class VCuoreInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    try {
      // ==========================================
      // 1. CONTEXT & CONFIGURATION (入力検証追加)
      // ==========================================
      const domainPrefix = this.node.tryGetContext('domainPrefix') as string | undefined;
      const callbackUrlsContext = this.node.tryGetContext('callbackUrls') as string | undefined;
      const logoutUrlsContext = this.node.tryGetContext('logoutUrls') as string | undefined;

      const normalizeList = (ctx?: string) => (ctx ? ctx.split(',').map((s) => s.trim()).filter(Boolean) : []);
      const callbackUrls = normalizeList(callbackUrlsContext);
      const logoutUrls = normalizeList(logoutUrlsContext);

      const sanitizeDomainPrefix = (value: string): string => {
        const sanitized = value
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        return sanitized.slice(0, 63);
      };

      const isValidUrl = (u: string) => {
        try {
          // URL コンストラクタで簡易検証
          // eslint-disable-next-line no-new
          new URL(u);
          return true;
        } catch {
          return false;
        }
      };

      const defaultLocal = ['http://localhost:5173/'];
      const finalCallbackUrls = callbackUrls.length ? callbackUrls : defaultLocal;
      const finalLogoutUrls = logoutUrls.length ? logoutUrls : defaultLocal;

      const invalidCallbacks = finalCallbackUrls.filter((u) => !isValidUrl(u));
      const invalidLogouts = finalLogoutUrls.filter((u) => !isValidUrl(u));

      if (invalidCallbacks.length) {
        throw new Error(`Invalid callbackUrls provided: ${invalidCallbacks.join(', ')}`);
      }

      if (invalidLogouts.length) {
        throw new Error(`Invalid logoutUrls provided: ${invalidLogouts.join(', ')}`);
      }

      const fallbackDomainPrefix = sanitizeDomainPrefix(`v-cuore-auth-${this.node.addr}`);
      const effectiveDomainPrefix = sanitizeDomainPrefix(domainPrefix ?? fallbackDomainPrefix);

      if (!effectiveDomainPrefix) {
        throw new Error('Computed domain prefix is empty after sanitization; provide a valid `domainPrefix` context or ensure node address is available.');
      }

    // ==========================================
    // 2. COGNITO AUTHENTICATION FORTRESS (既存)
    // ==========================================
    const userPool = new cognito.UserPool(this, 'VCuoreUserPool', {
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
    });

    userPool.applyRemovalPolicy(RemovalPolicy.DESTROY);

    const userPoolClient = userPool.addClient('VCuoreUserPoolClient', {
      generateSecret: false,
      supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO],
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: finalCallbackUrls,
        logoutUrls: finalLogoutUrls,
      },
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    const cognitoDomain = userPool.addDomain('VCuoreHostedUiDomain', {
      cognitoDomain: {
        domainPrefix: effectiveDomainPrefix,
      },
    });

    // ==========================================
    // 3. STORAGE LAYER (DynamoDB 記憶回路)
    // ==========================================
    // 🧠 AI チャット履歴テーブル
    const chatHistoryTable = new dynamodb.Table(this, 'VCuoreChatHistory', {
      partitionKey: { name: 'sessionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // 従量課金でコストを粛清
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // 📊 クイズ・学習進捗管理テーブル（テーマ4の「売り」）
    const userProgressTable = new dynamodb.Table(this, 'VCuoreUserProgress', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'quizId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // ==========================================
    // 4. COMPUTE LAYER (AWS Lambda 脳細胞)
    // ==========================================
    // AI チャット機能・データ処理を司る TypeScript 関数
    const lambdaEntry = path.join(__dirname, '../src/lambda/chat.ts');
    let chatLambda: lambda.IFunction;

    if (fs.existsSync(lambdaEntry)) {
      // 実際のハンドラが infra 配下にある場合は NodejsFunction を使ってビルド
      chatLambda = new NodejsFunction(this, 'VCuoreChatHandler', {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: lambdaEntry,
        handler: 'handler',
        environment: {
          CHAT_TABLE_NAME: chatHistoryTable.tableName,
          PROGRESS_TABLE_NAME: userProgressTable.tableName,
          BEDROCK_REGION: 'ap-northeast-1', // AIモデルが配備されている東京をエイム
        },
        timeout: Duration.seconds(30), // AIの長考に耐えるためのリソース確保
      });

      // Bedrock へのアクセス権は実際の実装がある場合のみ付与
      chatLambda.addToRolePolicy(new iam.PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: ['arn:aws:bedrock:ap-northeast-1::foundation-model/anthropic.claude-3-5-haiku-20241022-v1:0'],
      }));
    } else {
      // フォールバック: ソースが存在しない場合は合成可能にするための簡易ハンドラを使う
      const fallbackCode = `exports.handler = async function(event) { return { statusCode: 501, body: 'VCuore: lambda source not found. Replace infra/src/lambda/chat.ts with a real handler.' }; }`;
      chatLambda = new lambda.Function(this, 'VCuoreChatHandlerFallback', {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromInline(fallbackCode),
        handler: 'index.handler',
        environment: {
          CHAT_TABLE_NAME: chatHistoryTable.tableName,
          PROGRESS_TABLE_NAME: userProgressTable.tableName,
        },
        timeout: Duration.seconds(10),
      });
    }

    // 🔐 権限のジャスト・パリィ（最小権限の原則）
    chatHistoryTable.grantReadWriteData(chatLambda);
    userProgressTable.grantReadWriteData(chatLambda);

    // Amazon Bedrock (Claude 3.5 Haiku) を召喚する特権を付与
    chatLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel'],
      resources: ['arn:aws:bedrock:ap-northeast-1::foundation-model/anthropic.claude-3-5-haiku-20241022-v1:0'],
    }));

    // ==========================================
    // 5. ROUTING LAYER (Amazon API Gateway 表門)
    // ==========================================
    const api = new apigateway.RestApi(this, 'VCuoreRestApi', {
      restApiName: 'V-CUORE API Gateway',
      description: 'Backend API for V-CUORE AI Chat and Quiz features.',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // フロントからのパケットをジャスト・パリィで許可
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });

    // `/chat` エンドポイントを設営
    const chatResource = api.root.addResource('chat');
    chatResource.addMethod('POST', new apigateway.LambdaIntegration(chatLambda));

    // ==========================================
    // 6. OUTPUT PROTOCOLS (CloudFormation 出力)
    // ==========================================
    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      exportName: 'VCuoreUserPoolId',
      description: 'User Pool ID for the V-CUORE frontend.',
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      exportName: 'VCuoreUserPoolClientId',
      description: 'User Pool Client ID for the V-CUORE frontend.',
    });

    new CfnOutput(this, 'HostedUiDomain', {
      value: cognitoDomain.domainName,
      exportName: 'VCuoreHostedUiDomain',
      description: 'Hosted UI domain for Cognito OAuth.',
    });

    new CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      exportName: 'VCuoreApiEndpoint',
      description: 'API Gateway endpoint URL for frontend connection.',
    });

    new CfnOutput(this, 'CallbackUrls', {
      value: finalCallbackUrls.join(','),
      exportName: 'VCuoreCallbackUrls',
      description: 'Configured OAuth callback URLs.',
    });

    new CfnOutput(this, 'LogoutUrls', {
      value: finalLogoutUrls.join(','),
      exportName: 'VCuoreLogoutUrls',
      description: 'Configured OAuth logout URLs.',
    });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`[VCuoreInfraStack] ${msg}`);
    }
  }
}