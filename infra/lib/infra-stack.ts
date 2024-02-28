import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as apigv2 from "aws-cdk-lib/aws-apigatewayv2";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, "HelloLambda", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset("../functions/go-hello/build/function.zip"),
      handler: "bootstrap",
    });

    const lambdaIntegration = new HttpLambdaIntegration(
      "lambdaIntegration",
      lambdaFunction
    );

    const httpApi = new apigv2.HttpApi(this, "httpApi");

    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [apigv2.HttpMethod.GET],
      integration: lambdaIntegration,
    });
  }
}
