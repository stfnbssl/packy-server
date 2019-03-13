"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const cors_1 = require("./cors");
const wizziViewEngine_1 = require("./wizziViewEngine");
const session_1 = require("./session");
const compression_1 = require("./compression");
const helmet_1 = require("./helmet");
const passportAuth0_1 = require("./passportAuth0");
const userInViews_1 = require("./userInViews");
const auth0_1 = require("./auth0");
exports.checkJwt = auth0_1.checkJwt;
exports.checkScopes = auth0_1.checkScopes;
const auth0Secured_1 = require("./auth0Secured");
exports.auth0Secured = auth0Secured_1.default;
const appMiddlewares = [
    logger_1.LoggerMiddleware,
    compression_1.CompressionMiddleware,
    helmet_1.HelmetMiddleware,
    session_1.SessionMiddleware,
    passportAuth0_1.PassportAuth0Middleware,
    cors_1.CorsMiddleware,
    userInViews_1.UserInViewMiddleware,
    wizziViewEngine_1.WizziViewEngineMiddleware,
];
exports.appMiddlewares = appMiddlewares;
//# sourceMappingURL=index.js.map