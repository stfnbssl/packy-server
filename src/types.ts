import { Application, Router } from 'express';
import { fsTypes } from './features/filesystem';

export type ConfigType = {
    port: number;
    packyTemplatesFolder: string;
}

export type ControllerType = {
    path: string;
    router: Router;
    initialize: (initValues: AppInitializerType) => void;
}

export type MiddlewareType = (app: Application) => void;

export type AppInitializerType = {
    config: ConfigType;
    controllers: ControllerType[];
    middlewares: MiddlewareType[];
    fsDb: fsTypes.FsDb;
}