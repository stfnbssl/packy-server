import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser'
import { ControllerType, AppInitializerType } from '../../../types';
import { fsTypes } from '../../filesystem'
import { wizziTypes, wizziProds } from '../../wizzi'
import { PackyFiles, TemplateList, Template } from '../types';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';

var jsonParser = bodyParser.json()

export class ProductionsController implements ControllerType {
    public path = '/api/productions';
    public router = Router();
    public fsDb: fsTypes.FsDb | undefined;

    public initialize = (initValues: AppInitializerType) => {
        this.fsDb = initValues.fsDb;
        this.router.post(`${this.path}/artifact/:id`, this.generateArtifact);
    }

    private generateArtifact = async (request: Request, response: Response) => {
        const id = request.params.id;
        const files: PackyFiles = request.body;
        console.log('generateArtifact.received files', JSON.stringify(files, null, 2));
        wizziProds.generateArtifact(id, files).then((value)=>{
            console.log('ga', value);
            sendSuccess(response, {
                generatedArtifact: value
            })
        }).catch((err)=>{
            console.log('err', err);
        });
        
    }
}