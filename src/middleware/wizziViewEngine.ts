import * as path from 'path';
import { Application } from 'express';
import { MiddlewareType } from '../types';
import { wizziProds } from '../features/wizzi';

export const WizziViewEngineMiddleware: MiddlewareType = (app: Application) => {
    app.engine('ittf', function (filePath: string, options: any, callback: any) { // define the template engine
        const context = { ...options, locals: options._locals };
        console.log('WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2));
        wizziProds.generateArtifactFs(filePath, context).then(generated=>{
            callback(null, generated.artifactContent);
        }).catch(err=>{
            callback(err);
        })
    })
    app.set('views', path.resolve(__dirname,  '..', 'site', 'views')) // specify the views directory
    app.set('view engine', 'ittf') // register the template engine
}