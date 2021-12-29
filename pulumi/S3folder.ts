import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as mime from 'mime';
import * as path from 'path';
import * as glob from 'glob';

export class S3Folder extends pulumi.ComponentResource {
    public bucketName: pulumi.Output<string>;
    public websiteUrl: pulumi.Output<string>;

    constructor(bucketName: string, distPath: string, opts?: pulumi.ComponentResourceOptions) {
        super('pulumi:examples:S3Folder', bucketName, {}, opts); // Register this component with name pulumi:examples:S3Folder

        // Create a bucket and expose a website index document
        const siteBucket = new aws.s3.Bucket(bucketName, {
            website: {
                indexDocument: 'index.html',
            },
        }, { parent: this }); // specify resource parent

        // For each file in the directory, create an S3 object stored in `siteBucket`

        glob.sync(`${distPath}/**/*.*`).forEach(file => {
            new aws.s3.BucketObject(path.relative(distPath, file), {
                bucket: siteBucket,                               // reference the s3.Bucket object
                source: new pulumi.asset.FileAsset(file),     // use FileAsset to point to a file
                contentType: mime.getType(file) || undefined, // set the MIME type of the file
            }, { parent: this }); // specify resource parent
        });

        // Set the access policy for the bucket so all objects are readable
        new aws.s3.BucketPolicy('bucketPolicy', {
            bucket: siteBucket.bucket,
            policy: siteBucket.bucket.apply(this.publicReadPolicyForBucket),
        }, { parent: this }); // specify resource parent

        this.bucketName = siteBucket.bucket;
        this.websiteUrl = siteBucket.websiteEndpoint;

        // Register output properties for this component
        this.registerOutputs({
            bucketName: this.bucketName,
            websiteUrl: this.websiteUrl,
        });
    }

    publicReadPolicyForBucket(bucketName: string) {
        return JSON.stringify({
            Version: '2012-10-17',
            Statement: [{
                Effect: 'Allow',
                Principal: '*',
                Action: [
                    's3:GetObject'
                ],
                Resource: [
                    `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
                ]
            }]
        });
    }
}