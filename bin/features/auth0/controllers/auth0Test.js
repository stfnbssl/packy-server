"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../../middleware");
class Auth0TestController {
    constructor() {
        this.path = '/api/v1/auth0test';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`${this.path}/public`, this.getPublic);
            this.router.get(`${this.path}/private`, middleware_1.checkJwt, middleware_1.checkScopes(['read:messages']), this.getPrivate);
        };
        this.getPublic = async (request, response) => {
            response.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
        };
        this.getPrivate = async (request, response) => {
            response.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
        };
    }
}
exports.Auth0TestController = Auth0TestController;
//# sourceMappingURL=auth0Test.js.map