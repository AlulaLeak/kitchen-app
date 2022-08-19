#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ExistingResources } from "../lib/existing-resources";

const app = new cdk.App();
const existingResources = new ExistingResources(app, "ExistingResources");
