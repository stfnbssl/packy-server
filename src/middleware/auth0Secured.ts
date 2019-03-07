import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../types';

/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
export const Auth0SecuredMiddleware: MiddlewareType = (app: Application) => {
    app.use((req: Request, res: Response, next) => {
        if (req.user) { return next(); }
        (req.session as any).returnTo = req.originalUrl;
        res.redirect('/login');
    });
}

/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
export default function getSecured () {
    return function secured(req: Request, res: Response, next: Function) {
        if (req.user) { return next(); }
        (req.session as any).returnTo = req.originalUrl;
        res.redirect('/login');
    };
};
  