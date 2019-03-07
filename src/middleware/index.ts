import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../types';
import { LoggerMiddleware } from './logger';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { PassportAuth0Middleware } from './passportAuth0';

const middlewares: MiddlewareType[] = [
    LoggerMiddleware,
    WizziViewEngineMiddleware,
    PassportAuth0Middleware
];

export default middlewares;

