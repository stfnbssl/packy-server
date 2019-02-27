import * as express from 'express';
import * as cors from 'cors';
import { AppInitializerType, ConfigType } from './types';

class App {
    public app: express.Application;
    public config: ConfigType;
    public port: number;
 
    constructor(initValues: AppInitializerType) {
        this.config = initValues.config;
        this.port = this.config.port;
        this.app = express();
        this.app.use(cors())
        initValues.middlewares.forEach((middleware) => {
            middleware(this.app);
        });
        initValues.controllers.forEach((controller) => {
            console.log('installing router on path: ', controller.path);
            controller.initialize(initValues);
            this.app.use('/', controller.router);
        });
    }
 
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
    }
}
export default App;