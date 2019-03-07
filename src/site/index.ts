import { ControllerType } from '../types'
import { HomeController } from './controllers/home';

const siteControllers: ControllerType[] = [
    new HomeController(),
]

export { siteControllers }
