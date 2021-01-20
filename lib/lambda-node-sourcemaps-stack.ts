import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';

export class LambdaNodeSourcemapsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // A Lambda function without source maps support
    const noSourceMapsFunction = new NodejsFunction(this, 'no-source-maps', {
      entry: 'functions/no-source-maps/lambda.ts',
      handler: 'handler',
      bundling: {
        sourceMap: true,
        minify: true
      }
    })

    // A Lambda function with the source-map-support module
    const sourceMapSupportFunction = new NodejsFunction(this, 'source-map-support', {
      entry: 'functions/source-map-support/lambda.ts',
      handler: 'handler',
      bundling: {
        sourceMap: true,
        minify: true
      }
    })

    // A Lambda function with the native source map support
    const nativeSourceMaps = new NodejsFunction(this, 'native-source-maps', {
      entry: 'functions/no-source-maps/lambda.ts',
      handler: 'handler',
      environment: {
        NODE_OPTIONS: '--enable-source-maps'
      },
      bundling: {
        sourceMap: true,
        minify: true
      }
    })

    // An HTTP API
    const api = new HttpApi(this, 'api', {})

    const noSourceMapsFunctionIntegration = new LambdaProxyIntegration({
      handler: noSourceMapsFunction
    })

    api.addRoutes({
      path: '/no-source-maps',
      methods: [HttpMethod.GET],
      integration: noSourceMapsFunctionIntegration
    })

    const sourceMapSupportFunctionIntegration = new LambdaProxyIntegration({
      handler: sourceMapSupportFunction
    })

    api.addRoutes({
      path: '/source-map-support',
      methods: [HttpMethod.GET],
      integration: sourceMapSupportFunctionIntegration
    })

    const nativeSourceMapsIntegration = new LambdaProxyIntegration({
      handler: nativeSourceMaps
    })

    api.addRoutes({
      path: '/native-source-maps',
      methods: [HttpMethod.GET],
      integration: nativeSourceMapsIntegration
    })

    new cdk.CfnOutput(this, 'apiUrl', {
      value: `https://${api.httpApiId}.execute-api.${cdk.Aws.REGION}.amazonaws.com`
    })
  }
}
