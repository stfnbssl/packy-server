"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_auth0_1 = require("passport-auth0");
const config_1 = require("../features/config");
// Configure Passport to use Auth0
var strategy = new passport_auth0_1.Strategy({
    domain: config_1.config.Auth0Domain,
    clientID: config_1.config.Auth0PackyClientId,
    clientSecret: config_1.config.Auth0PackyClientSecret,
    callbackURL: config_1.config.Auth0PackyCallbackUrl
}, function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
});
exports.PassportAuth0Middleware = (app) => {
    passport.use(strategy);
    // You can use this section to keep a smaller payload
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    app.use(passport.initialize());
    app.use(passport.session());
};
//# sourceMappingURL=passportAuth0.js.map