import { aws_dynamodb as ddb, aws_lambda as lambda } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class SharedStack extends cdk.Stack {
  public readonly database: ddb.Table;
  public readonly layer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);
    this.database = new ddb.Table(this, "order-table", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PROVISIONED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    // Add auto-scaling
    const readScaling = this.database.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 50,
    });
    readScaling.scaleOnUtilization({
      targetUtilizationPercent: 50,
    });
    // Add GSI
    this.database.addGlobalSecondaryIndex({
      partitionKey: {
        name: "gsi1pk",
        type: ddb.AttributeType.STRING,
      },
      sortKey: {
        name: "gsi1pk",
        type: ddb.AttributeType.STRING,
      },
      indexName: "gsi1pk-gsi1pk-index",
    });
    // Add a Lambda layer for sharing database functions
    this.layer = new lambda.LayerVersion(this, "db-functions-layer", {
      code: lambda.Code.fromAsset("lambda"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    });
  }
}
