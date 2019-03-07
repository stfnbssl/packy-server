"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const passport = require("passport");
const passport_auth0_1 = require("passport-auth0");
const config_1 = require("../config");
const config = config_1.default();
// Configure Passport to use Auth0
var strategy = new passport_auth0_1.Strategy({
    domain: config.Auth0Domain,
    clientID: config.Auth0ClientId,
    clientSecret: config.Auth0ClientSecret,
    callbackURL: config.Auth0CallbackUrl || 'http://localhost:3000/callback'
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
    const cookieOptions = {
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false
    };
    const sess = {
        secret: 'CHANGE THIS SECRET',
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: true
    };
    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());
};
//# sourceMappingURL=passportAuth0.js.map