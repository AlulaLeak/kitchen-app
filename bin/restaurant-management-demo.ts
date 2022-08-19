#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ExistingResources } from "../lib/existing-resources";
import { SharedStack } from "../lib/shared-stack";

const app = new cdk.App();
const existingResources = new ExistingResources(app, "ExistingResources");
const sharedStack = new SharedStack(app, "Sharedstack");
