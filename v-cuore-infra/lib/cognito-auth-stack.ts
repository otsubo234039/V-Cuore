import { CfnOutput, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class CognitoAuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    try {
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
      authFlows: {
        userPassword: true,
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
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`[CognitoAuthStack] ${msg}`);
    }
  }
}