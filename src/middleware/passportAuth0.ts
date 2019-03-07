import { Application, Request, Response, RequestHandler, CookieOptions } from 'express';
import { MiddlewareType } from '../types';
import * as session from 'express-session';
import * as passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import configInit from '../config';
import { ConfigType } from '../types';
 
const config: ConfigType = configInit();

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: config.Auth0Domain,
        clientID: config.Auth0ClientId,
        clientSecret: config.Auth0ClientSecret,
        callbackURL: config.Auth0CallbackUrl || 'http://localhost:3000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

export const PassportAuth0Middleware: MiddlewareType = (app: Application) => {
    passport.use(strategy);
    // You can use this section to keep a smaller payload
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    const cookieOptions: CookieOptions = {
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false
    }
    const sess: session.SessionOptions = {
        secret: 'CHANGE THIS SECRET',
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: true
    };
    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());
}