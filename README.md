## Running Image Sharp on AWS Using Pulumi

This repo attempts to show how someone might build a cloud application that leverages the popular [Sharp](https://github.com/lovell/sharp) library to do serverless image resizing in AWS Lambda. Cloud infrastructure can be deployed thanks to [Pulumi](https://github.com/pulumi/pulumi).

### Issues
Despite following the [Sharp Installation Instructions for Lambda Environments](http://sharp.pixelplumbing.com/en/stable/install/#aws-lambda) with `npm run lambda-build` before deploying, the Lambda is never able to properly start.