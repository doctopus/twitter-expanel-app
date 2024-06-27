const { CdkNextjsStandaloneStack } = require('cdk-nextjs-standalone');
const { App, Stack, StackProps } = require('aws-cdk-lib');

class NextStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        new CdkNextjsStandaloneStack(this, 'NextjsApp', {
            // Specify the entry point for your Next.js application
            entry: '.',
            // Specify the environment variables for your application
            environment: {
                // Add any necessary environment variables here
            },
            // Specify the domain for your application (optional)
            domain: {
                // domainName: 'example.com',
                // domainUrl: 'https://example.com',
            },
        });
    }
}

const app = new App();
new NextStack(app, 'NextStack', {
    // Add any necessary stack properties here
});