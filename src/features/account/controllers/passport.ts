import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser';
import * as passport from 'passport';
import { ControllerType, AppInitializerType } from '../../../types';
import { auth0Requests } from '../../auth0';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';

var jsonParser = bodyParser.json()

export class PassportController implements ControllerType {
    public path = '/account';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/login`, passport.authenticate('auth0', {
            scope: 'openid email profile'
        }), function (req, res) {
            res.redirect('/');
        });
        this.router.get(`${this.path}/callback`, this.callback);
        this.router.get(`${this.path}/logout`, this.logout);
    }

    private callback = async (request: Request, response: Response, next: Function) => {
        passport.authenticate('auth0', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return response.redirect('/login'); }
            request.logIn(user, function (err) {
              if (err) { return next(err); }
              let returnTo = '/user';
              if (request.session) {
                returnTo = request.session.returnTo;
                delete request.session.returnTo;
              }
              response.redirect(returnTo || '/user');
            });
          })(request, response, next);
    }

    private logout = async (request: Request, response: Response) => {
        request.logout();
        response.redirect('/');
    }
}