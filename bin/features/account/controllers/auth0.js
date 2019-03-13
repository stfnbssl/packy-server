"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const auth0_1 = require("../../auth0");
const response_1 = require("../../../utils/response");
var jsonParser = bodyParser.json();
class Auth0Controller {
    constructor() {
        this.path = '/api/v1/auth0';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`${this.path}/users`, this.getUsers);
            this.router.get(`${this.path}/users/:id`, this.getUser);
        };
        this.getUsers = async (request, response) => {
            const users = await auth0_1.auth0ApiCalls.getUsers();
            console.log('getUsers.received users', JSON.stringify(users, null, 2));
            response_1.sendSuccess(response, {
                users: users
            });
        };
        this.getUser = async (request, response) => {
            const user = await auth0_1.auth0ApiCalls.getUser(request.params.id);
            console.log('getUser.received user', JSON.stringify(user, null, 2));
            response_1.sendSuccess(response, {
                user: user
            });
        };
    }
}
exports.Auth0Controller = Auth0Controller;
//# sourceMappingURL=auth0.js.map