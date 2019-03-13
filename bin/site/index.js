"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = require("./controllers/home");
const account_1 = require("./controllers/account");
const repo_1 = require("./controllers/repo");
const siteControllers = [
    new home_1.HomeController(),
    new account_1.AccountController(),
    new repo_1.RepoController(),
];
exports.siteControllers = siteControllers;
//# sourceMappingURL=index.js.map