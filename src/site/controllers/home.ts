import { Router, Request, Response } from 'express';
import { ControllerType, AppInitializerType } from '../../types';

export class HomeController implements ControllerType {
    public path = '';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`/`, this.home);
    }

    private home = async (request: Request, response: Response) => {
        response.render('index.html.ittf', { title: 'Site Home' });
    }
}