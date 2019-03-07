"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accountTypes = require("./types");
exports.accountTypes = accountTypes;
const auth0_1 = require("./controllers/auth0");
const accountControllers = [
    new auth0_1.Auth0Controller(),
];
exports.accountControllers = accountControllers;
//# sourceMappingURL=index.js.map