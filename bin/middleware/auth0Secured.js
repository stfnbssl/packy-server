"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
exports.Auth0SecuredMiddleware = (app) => {
    app.use((req, res, next) => {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    });
};
/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
function getSecured() {
    return function secured(req, res, next) {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    };
}
exports.default = getSecured;
;
//# sourceMappingURL=auth0Secured.js.map