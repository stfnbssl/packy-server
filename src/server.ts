import { ConfigType, ControllerType, AppInitializerType, MiddlewareType } from './types';
import configInit from './config';
import filesystemStart from './db/filesystem';
import { packyControllers } from './features/packy';
import { fsTypes } from './features/filesystem';
import appMiddlewares from './middlewares';
import App from './App';

async function start() {
  
  const config: ConfigType = configInit();

  const fsDb = await filesystemStart(config);
  
  let controllers = packyControllers;
  
  const middlewares: MiddlewareType[] = appMiddlewares.concat(
  );
  
  const appInitializer: AppInitializerType = {
    config,
    controllers,
    middlewares,
    fsDb
  }
  
  const app = new App(appInitializer);
  app.listen();
}

try{
  start();
} catch(ex){
  console.log(ex);
}


