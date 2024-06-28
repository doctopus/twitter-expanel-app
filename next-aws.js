const { App, Stack, aws_lambda, aws_apigateway, aws_cloudfront, aws_s3, CfnOutput, RemovalPolicy } = require('aws-cdk-lib');
const { join } = require('path');
const { S3Origin } = require('@aws-cdk/aws-cloudfront-origins');

class NextLambdaFunction extends aws_lambda.Function {
    constructor(scope, id, props) {
        super(scope, id, {
            runtime: aws_lambda.Runtime.NODEJS_18_X,
            code: aws_lambda.Code.fromAsset(join(__dirname, 'app')),
            handler: 'server.handler',
            environment: {
                NEXTAUTH_URL: props.nextAuthUrl,
            },
        });
    }
}

class NextApiGateway extends aws_apigateway.RestApi {
    constructor(scope, id, props) {
        super(scope, id, {
            restApiName: 'Next.js API',
        });

        this.root.addMethod('ANY', new aws_apigateway.LambdaIntegration(props.nextLambda));
    }
}

class NextStaticAssets extends aws_s3.Bucket {
    constructor(scope, id, props) {
        super(scope, id, {
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
        });
    }
}

class NextCloudFrontDistribution extends aws_cloudfront.Distribution {
    constructor(scope, id, props) {
        super(scope, id, {
            defaultBehavior: {
                origin: new S3Origin(props.assetsBucket),
            },
        });
    }
}

class NextStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const nextLambda = new NextLambdaFunction(this, 'NextLambda', {
            nextAuthUrl: props.nextAuthUrl,
        });

        const nextApi = new NextApiGateway(this, 'NextAPI', {
            nextLambda,
        });

        const assetsBucket = new NextStaticAssets(this, 'NextjsAssets');

        const distribution = new NextCloudFrontDistribution(this, 'NextjsDistribution', {
            assetsBucket,
        });

        new CfnOutput(this, 'CloudFrontDistributionDomain', {
            value: distribution.distributionDomainName,
        });
    }
}

const app = new App();
new NextStack(app, 'NextStack', {
    nextAuthUrl: process.env.NEXTAUTH_URL,
});