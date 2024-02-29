import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as apigv2 from "aws-cdk-lib/aws-apigatewayv2";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const goLambdaFunction = new lambda.Function(this, "GoHelloLambda", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset("../functions/go-hello/build/function.zip"),
      handler: "bootstrap",
    });

    const pyLambdaFunction = new lambda.Function(this, "PyHelloLambda", {
      runtime: lambda.Runtime.PYTHON_3_12,
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset("../functions/py-hello/build/function.zip"),
      handler: "handler.handler",
    });

    const goLambdaIntegration = new HttpLambdaIntegration(
      "goLambdaIntegration",
      goLambdaFunction
    );

    const pyLambdaIntegration = new HttpLambdaIntegration(
      "pyLambdaIntegration",
      pyLambdaFunction
    );

    const httpApi = new apigv2.HttpApi(this, "httpApi");

    httpApi.addRoutes({
      path: "/go/{proxy+}",
      methods: [apigv2.HttpMethod.GET],
      integration: goLambdaIntegration,
    });

    httpApi.addRoutes({
      path: "/py/{proxy+}",
      methods: [apigv2.HttpMethod.GET],
      integration: pyLambdaIntegration,
    });
  }
}
