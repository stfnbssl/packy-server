"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The purpose of this middleware is to have the `user`
 * object available for all views.
 *
 */
exports.UserInViewMiddleware = (app) => {
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });
};
//# sourceMappingURL=userInViews.js.map