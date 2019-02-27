import { ControllerType } from '../../types'
import * as packyTypes from './types';
import { TemplatesController } from './controllers/templates';

const packyControllers: ControllerType[] = [
    new TemplatesController()
]

export { packyTypes, packyControllers }