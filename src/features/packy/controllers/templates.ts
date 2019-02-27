import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser'
import { ControllerType, AppInitializerType } from '../../../types';
import { fsTypes } from '../../filesystem'
import { PackyFiles, TemplateList, Template } from '../types';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';

var jsonParser = bodyParser.json()

export class TemplatesController implements ControllerType {
    public path = '/api/templates';
    public router = Router();
    public fsDb: fsTypes.FsDb | undefined;

    public initialize = (initValues: AppInitializerType) => {
        this.fsDb = initValues.fsDb;
        this.router.get(this.path, this.getAllTemplates);
        this.router.get(`${this.path}/:id`, this.getTemplateById);
    }

    private getAllTemplates = async (request: Request, response: Response) => {
        sendPromiseResult<string[]>(
            response,
            (this.fsDb as fsTypes.FsDb).getPackyTemplatesList()
        );
    }
    
    private getTemplateById = async (request: Request, response: Response) => {
        const id = request.params.id;
        const template = await (this.fsDb as fsTypes.FsDb).getPackyTemplate(id)
        sendSuccess(
            response,
            template
        );
    }
}