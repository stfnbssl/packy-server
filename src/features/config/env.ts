import { cleanEnv, str, port } from 'envalid';
import { ConfigType } from './types';

function validateEnv() {
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(),
        SESSION_SECRET: str(),
        PACKY_TEMPLATES_FOLDER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        AUTH0_DOMAIN: str(),
        AUTH0_PACKY_CLIENT_ID: str(),
        AUTH0_PACKY_CLIENT_SECRET: str(),
        AUTH0_PACKY_CALLBACK_URL: str(),
        AUTH0_PACKY_API_ID: str(),
        AUTH0_PACKY_BACKEND_APP_ID: str(),
        AUTH0_PACKY_BACKEND_APP_SECRET: str(),
    });
    return checkedEnv;
}

export const packyFilePrefix = 'json:/';

let config: ConfigType;

export default function create(): ConfigType {
    if (config == null) {
        const checkedEnv = validateEnv();
        config = {
            port: checkedEnv.PORT,
            packyTemplatesFolder: checkedEnv.PACKY_TEMPLATES_FOLDER,
            sessionSecret: checkedEnv.SESSION_SECRET,
            mongoPath: checkedEnv.MONGO_PATH,
            mongoUser: checkedEnv.MONGO_USER,
            mongoPassword: checkedEnv.MONGO_PASSWORD,
            Auth0Domain: checkedEnv.AUTH0_DOMAIN,
            Auth0PackyClientId: checkedEnv.AUTH0_PACKY_CLIENT_ID,
            Auth0PackyClientSecret: checkedEnv.AUTH0_PACKY_CLIENT_SECRET,
            Auth0PackyCallbackUrl: checkedEnv.AUTH0_PACKY_CALLBACK_URL,
            Auth0PackyApiId: checkedEnv.AUTH0_PACKY_API_ID,
            Auth0PackyBackendAppId: checkedEnv.AUTH0_PACKY_BACKEND_APP_ID,
            Auth0PackyBackendAppSecret: checkedEnv.AUTH0_PACKY_BACKEND_APP_SECRET,
        };
        Object.keys(config).forEach(element => {
            if (element.indexOf("Pass") < 0) {
                console.log('Created config', element, (config as any)[element]);    
            }
        });
    }
    return config;
}