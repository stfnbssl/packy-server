import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from './types';

const LoggerMiddleware: MiddlewareType = (app: Application) => {
    app.use((request: Request, response: Response, next) => {
        console.log(`${request.method} ${request.path}`);
        next();
    });
}

const middlewares: MiddlewareType[] = [
    LoggerMiddleware
];

export default middlewares;

