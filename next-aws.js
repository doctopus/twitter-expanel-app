const { App, Stack, aws_lambda, aws_apigateway, aws_cloudfront, aws_s3 } = require('aws-cdk-lib');
const { RemovalPolicy } = require('aws-cdk-lib');
const { join } = require('path');

class NextStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the Lambda function for your Next.js application
        const nextLambda = new aws_lambda.Function(this, 'NextLambda', {
            runtime: aws_lambda.Runtime.NODEJS_18_X,
            code: aws_lambda.Code.fromAsset(join(__dirname, 'app')),
            handler: 'server.handler',
            environment: {
                NEXTAUTH_URL: 'https://example.com',
                // Add any other environment variables here
            },
        });

        // Create the API Gateway to expose the Lambda function
        const api = new aws_apigateway.RestApi(this, 'NextAPI', {
            restApiName: 'Next.js API',
        });

        api.root.addMethod('ANY', new aws_apigateway.LambdaIntegration(nextLambda));

        // Create the S3 bucket and CloudFront distribution for static assets
        const assetsBucket = new aws_s3.Bucket(this, 'NextjsAssets', {
            bucketName: 'my-nextjs-assets',
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
        });

        const distribution = new aws_cloudfront.Distribution(this, 'NextjsDistribution', {
            defaultBehavior: {
                origin: new aws_cloudfront.BucketWebsiteConfiguration(assetsBucket),
                // Add any other CloudFront behaviors as needed
            },
        });

        // Output the CloudFront distribution domain
        new this.CfnOutput(this, 'CloudFrontDistributionDomain', {
            value: distribution.distributionDomain,
        });
    }
}

const app = new App();
new NextStack(app, 'NextStack', {
    // Add any necessary stack properties here
});