import { CfnOutput, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class VCuoreInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainPrefix = this.node.tryGetContext('domainPrefix') as string | undefined;
    const callbackUrlsContext = this.node.tryGetContext('callbackUrls') as string | undefined;
    const logoutUrlsContext = this.node.tryGetContext('logoutUrls') as string | undefined;

    const callbackUrls = callbackUrlsContext
      ? callbackUrlsContext.split(',').map((url) => url.trim()).filter(Boolean)
      : ['http://localhost:5173/'];

    const logoutUrls = logoutUrlsContext
      ? logoutUrlsContext.split(',').map((url) => url.trim()).filter(Boolean)
      : ['http://localhost:5173/'];

    const sanitizeDomainPrefix = (value: string): string => {
      const sanitized = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      return sanitized.slice(0, 63);
    };

    const fallbackDomainPrefix = sanitizeDomainPrefix(`v-cuore-auth-${this.node.addr}`);
    const effectiveDomainPrefix = sanitizeDomainPrefix(domainPrefix ?? fallbackDomainPrefix);

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
        callbackUrls,
        logoutUrls,
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

    new CfnOutput(this, 'CallbackUrls', {
      value: callbackUrls.join(','),
      exportName: 'VCuoreCallbackUrls',
      description: 'Configured OAuth callback URLs.',
    });

    new CfnOutput(this, 'LogoutUrls', {
      value: logoutUrls.join(','),
      exportName: 'VCuoreLogoutUrls',
      description: 'Configured OAuth logout URLs.',
    });
  }
}