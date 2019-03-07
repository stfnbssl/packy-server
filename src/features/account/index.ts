import { ControllerType } from '../../types'
import * as accountTypes from './types';
import { Auth0Controller } from './controllers/auth0';
import { PassportController } from './controllers/passport';

const accountControllers: ControllerType[] = [
    new Auth0Controller(),
    new PassportController(),
]

export { accountTypes, accountControllers }