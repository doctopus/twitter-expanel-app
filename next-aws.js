const { App, Stack } = require('aws-cdk-lib');
const { Nextjs } = require('cdk-nextjs-standalone');

class NextStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const nextjs = new Nextjs(this, 'Nextjs', {
            entry: './app', // Specify the relative path to your Next.js application
            environment: {
                // Add your environment variables here
                NEXTAUTH_URL: 'https://example.com',
            },
        });

        new this.CfnOutput(this, 'CloudFrontDistributionDomain', {
            value: nextjs.distribution.distributionDomain,
        });
    }
}

const app = new App();
new NextStack(app, 'NextStack', {
    // Add any necessary stack properties here
});