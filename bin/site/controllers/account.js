"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const auth0_1 = require("../../features/auth0");
class AccountController {
    constructor() {
        this.path = '/account';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`${this.path}/login`, passport.authenticate('auth0', {
                scope: 'openid email profile'
            }), (req, res) => {
                res.redirect('/');
            });
            this.router.get(`${this.path}/callback`, this.callback);
            this.router.get(`${this.path}/logout`, this.logout);
            this.router.get(`${this.path}/user`, initValues.auth0Secured(), this.user);
        };
        this.callback = async (request, response, next) => {
            passport.authenticate('auth0', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return response.redirect(`${this.path}/login`);
                }
                request.logIn(user, async (err) => {
                    if (err) {
                        return next(err);
                    }
                    const full_user = await auth0_1.auth0ApiCalls.getUser(user.user_id);
                    console.log('full_user', full_user);
                    request.session.github_accessToken = full_user.identities[0].access_token;
                    let returnTo = `${this.path}/user`;
                    if (request.session) {
                        returnTo = request.session.returnTo;
                        delete request.session.returnTo;
                    }
                    response.redirect(returnTo || `${this.path}/user`);
                });
            })(request, response, next);
        };
        this.logout = async (request, response) => {
            request.logout();
            response.redirect('/');
        };
        this.user = async (request, response) => {
            const _a = request.user, { _raw, _json } = _a, user = __rest(_a, ["_raw", "_json"]);
            response.render('account/user.html.ittf', {
                user: user,
                userProfile: JSON.stringify(user, null, 2),
                title: 'Profile page'
            });
        };
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.js.map