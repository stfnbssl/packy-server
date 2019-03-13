import { ControllerType, AppInitializerType, MiddlewareType } from './features/app/types';
import { ModelBuilderType } from './features/app';
import { config } from './features/config';
import filesystemStart from './db/filesystem';
import mongodbStart from './db/mongodb';
import { siteControllers } from './site';
import { accountControllers } from './features/account';
import { auth0Controllers } from './features/auth0';
import { packyModelBuilders, packyControllers } from './features/packy';
import { appMiddlewares, auth0Secured } from './middleware';
import App from './App';

async function start() {
  
  const fsDb = await filesystemStart(config);

  let modelBuilders: ModelBuilderType[] = [
    ...packyModelBuilders
  ];
  
  mongodbStart(config, modelBuilders);
  
  let controllers: ControllerType[] = [
    ...siteControllers,
    ...accountControllers,
    ...auth0Controllers,
    ...packyControllers, 
  ];
  
  const middlewares: MiddlewareType[] = appMiddlewares.concat();
  
  const appInitializer: AppInitializerType = {
    config,
    controllers,
    middlewares,
    fsDb,
    auth0Secured
  }
  
  const app = new App(appInitializer);
  app.listen();
}

try {
  start();
} catch(ex) {
  console.log(ex);
}