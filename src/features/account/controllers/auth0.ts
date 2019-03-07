import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser';
import { ControllerType, AppInitializerType } from '../../../types';
import { auth0Requests } from '../../auth0';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';
import { file } from 'wizzi';

var jsonParser = bodyParser.json()

export class Auth0Controller implements ControllerType {
    public path = '/api/auth0';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/users`, this.getUsers);
    }

    private getUsers = async (request: Request, response: Response) => {
        const users = await auth0Requests.getUsers(); 
        console.log('getUsers.received users', JSON.stringify(users, null, 2));
        sendSuccess(response, {
            users: users
        })
    }
}