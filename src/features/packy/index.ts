import { ControllerType } from '../../types'
import * as packyTypes from './types';
import { TemplatesController } from './controllers/templates';
import { ProductionsController } from './controllers/productions';

const packyControllers: ControllerType[] = [
    new TemplatesController(),
    new ProductionsController()
]

export { packyTypes, packyControllers }