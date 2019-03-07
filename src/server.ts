import { ConfigType, ControllerType, AppInitializerType, MiddlewareType } from './types';
import configInit from './config';
import filesystemStart from './db/filesystem';
import { siteControllers } from './site';
import { accountControllers } from './features/account';
import { packyControllers } from './features/packy';
import { fsTypes } from './features/filesystem';
import appMiddlewares from './middleware';
import App from './App';

async function start() {
  
  const config: ConfigType = configInit();

  const fsDb = await filesystemStart(config);
  
  let controllers: ControllerType[] = [
    ...siteControllers,
    ...accountControllers,
    ...packyControllers, 
  ];
  
  const middlewares: MiddlewareType[] = appMiddlewares.concat();
  
  const appInitializer: AppInitializerType = {
    config,
    controllers,
    middlewares,
    fsDb
  }
  
  const app = new App(appInitializer);
  app.listen();
}

try {
  start();
} catch(ex){
  console.log(ex);
}


