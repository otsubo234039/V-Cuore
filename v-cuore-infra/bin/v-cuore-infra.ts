import * as cdk from 'aws-cdk-lib';
import { VCuoreInfraStack } from '../lib/v-cuore-infra-stack';

const app = new cdk.App();

new VCuoreInfraStack(app, 'VCuoreInfraStack', {
  /* 🛰️ ここにちみの固有座標を直書きして「わからせ」る */
  env: { 
    account: '743107202624', 
    region: 'ap-northeast-3' // 大阪リージョン
  },
});