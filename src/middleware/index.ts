import { MiddlewareType } from '../features/app/types';
import { LoggerMiddleware } from './logger';
import { CorsMiddleware } from './cors';
import { StaticFilesMiddleware } from './static';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { IttfDocumentsMiddleware } from './ittf';
import { SessionMiddleware } from './session';
import { CompressionMiddleware } from './compression';
import { HelmetMiddleware } from './helmet';
import { PassportAuth0Middleware } from './passportAuth0';
import { UserInViewMiddleware } from './userInViews';
import { checkJwt, checkScopes } from './auth0';
import auth0Secured from './auth0Secured';

const appMiddlewares: MiddlewareType[] = [
    LoggerMiddleware,
    CompressionMiddleware,
    HelmetMiddleware,
    SessionMiddleware,
    PassportAuth0Middleware,
    CorsMiddleware,
    UserInViewMiddleware,
    IttfDocumentsMiddleware,
    StaticFilesMiddleware,
    WizziViewEngineMiddleware,
];

export { appMiddlewares, auth0Secured, checkJwt, checkScopes };