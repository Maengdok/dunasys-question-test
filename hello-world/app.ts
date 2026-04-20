import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import fs from 'fs/promises';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    switch (event.path) {
        case '/version':
            const version = await getVersion();
            return apiResponse(200, { version: version });
        default:
            return apiResponse(200, { message: 'hello world' });
    }
};

const getVersion = async (): Promise<string> => {
    const data = await fs.readFile('package.json', 'utf8');
    const json = JSON.parse(data);

    return json.version;
};

const apiResponse = (code: number, body: object) => {
    return {
        statusCode: code,
        body: JSON.stringify(body),
    };
};
