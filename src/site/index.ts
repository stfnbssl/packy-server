import { ControllerType } from '../features/app/types'
import { HomeController } from './controllers/home';
import { AccountController } from './controllers/account';
import { RepoController } from './controllers/repo';

const siteControllers: ControllerType[] = [
    new HomeController(),
    new AccountController(),
    new RepoController(),
]

export { siteControllers }
