#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { VCuoreInfraStack } from '../lib/v-cuore-infra-stack';

const app = new App();

new VCuoreInfraStack(app, 'VCuoreInfraStack');