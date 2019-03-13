"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
//TODO (missing @types/ declaration) import * as jwtAuthz from 'express-jwt-authz';
const jwksRsa = require("jwks-rsa");
const config_1 = require("../features/config");
exports.checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys 
    // provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config_1.config.Auth0Domain}/.well-known/jwks.json`
    }),
    // Validate the audience and the issuer.
    audience: config_1.config.Auth0PackyApiId,
    issuer: `https://${config_1.config.Auth0Domain}/`,
    algorithms: ['RS256']
});
exports.checkScopes = (scopes) => jwtAuthz(scopes);
exports.Auth0Middleware = (app) => {
    app.use(exports.checkJwt);
};
// included module express-jwt-authz missing @types/ declaration
const jwtAuthz = (expectedScopes, options) => {
    if (!Array.isArray(expectedScopes)) {
        throw new Error('Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)');
    }
    return (req, res, next) => {
        const error = (res) => {
            const err_message = 'Insufficient scope';
            if (options && options.failWithError) {
                return next({
                    statusCode: 403,
                    error: 'Forbidden',
                    message: err_message
                });
            }
            res.append('WWW-Authenticate', `Bearer scope="${expectedScopes.join(' ')}", error="${err_message}"`);
            res.status(403).send(err_message);
        };
        if (expectedScopes.length === 0) {
            return next();
        }
        if (!req.user || typeof req.user.scope !== 'string') {
            return error(res);
        }
        const scopes = req.user.scope.split(' ');
        const allowed = expectedScopes.some(scope => scopes.includes(scope));
        return allowed ? next() : error(res);
    };
};
//# sourceMappingURL=auth0.js.map