"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
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
exports.Auth0Middleware = (app) => {
    app.use(jwtCheck);
};
//# sourceMappingURL=auth0.js.map