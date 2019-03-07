import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../types';
import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-qwf9-zob.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://packy/api/v1',
    issuer: "https://dev-qwf9-zob.eu.auth0.com/",
    algorithms: ['RS256']
});

export const Auth0Middleware: MiddlewareType = (app: Application) => {
    app.use(jwtCheck);
}

