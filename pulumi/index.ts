// import * as pulumi from '@pulumi/pulumi';
// import * as aws from '@pulumi/aws';
// import * as awsx from '@pulumi/awsx';
import {S3Folder} from './S3folder';

const folder = new S3Folder('my-bucket', '../dist');

export const bucketName = folder.bucketName;
export const websiteUrl = folder.websiteUrl;
