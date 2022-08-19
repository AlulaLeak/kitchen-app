import { aws_s3 as s3 } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class ExistingResources extends cdk.Stack {
  public readonly archiveBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);
    this.archiveBucket = new s3.Bucket(this, "existing-order-archive");
  }
}
