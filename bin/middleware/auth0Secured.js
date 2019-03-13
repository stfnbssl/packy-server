"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/account/login`.
 *
 */
function getSecured() {
    console.log('getSecured called');
    return function secured(req, res, next) {
        console.log('secured called', req.user);
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/account/login');
    };
}
exports.default = getSecured;
;
//# sourceMappingURL=auth0Secured.js.map