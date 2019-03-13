"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth0ApiCalls = require("./apicalls");
exports.auth0ApiCalls = auth0ApiCalls;
const auth0Test_1 = require("./controllers/auth0Test");
const auth0Controllers = [
    new auth0Test_1.Auth0TestController(),
];
exports.auth0Controllers = auth0Controllers;
//# sourceMappingURL=index.js.map