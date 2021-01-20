#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaNodeSourcemapsStack } from '../lib/lambda-node-sourcemaps-stack';

const app = new cdk.App();
new LambdaNodeSourcemapsStack(app, 'LambdaNodeSourcemapsStack');
