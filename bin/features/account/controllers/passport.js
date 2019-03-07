"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var jsonParser = bodyParser.json();
class PassportController {
    constructor() {
        this.path = '/account';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`${this.path}/login`, passport.authenticate('auth0', {
                scope: 'openid email profile'
            }), function (req, res) {
                res.redirect('/');
            });
            this.router.get(`${this.path}/callback`, this.callback);
            this.router.get(`${this.path}/logout`, this.logout);
        };
        this.callback = async (request, response, next) => {
            passport.authenticate('auth0', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return response.redirect('/login');
                }
                request.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    let returnTo = '/user';
                    if (request.session) {
                        returnTo = request.session.returnTo;
                        delete request.session.returnTo;
                    }
                    response.redirect(returnTo || '/user');
                });
            })(request, response, next);
        };
        this.logout = async (request, response) => {
            request.logout();
            response.redirect('/');
        };
    }
}
exports.PassportController = PassportController;
//# sourceMappingURL=passport.js.map