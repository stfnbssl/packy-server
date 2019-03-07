import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../types';
import * as cookieParser from 'cookie-parser';

export const CookieMiddleware: MiddlewareType = (app: Application) => {
    app.use(cookieParser());
}