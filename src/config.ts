import { cleanEnv, str, port } from 'envalid';
import { ConfigType } from './types';

function validateEnv() {
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(),
        PACKY_TEMPLATES_FOLDER: str(),
        AUTH0_DOMAIN: str(),
        AUTH0_CLIENT_ID: str(),
        AUTH0_CLIENT_SECRET: str(),
        AUTH0_CALLBACK_URL: str(),
        AUTH0_MANAGEMENT_API_TOKEN: str(),
        AUTH0_MANAGEMENT_ENDPOINT: str(),
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
            Auth0Domain: checkedEnv.AUTH0_DOMAIN,
            Auth0ClientId: checkedEnv.AUTH0_CLIENT_ID,
            Auth0ClientSecret: checkedEnv.AUTH0_CLIENT_SECRET,
            Auth0CallbackUrl: checkedEnv.AUTH0_CALLBACK_URL,
            Auth0ManagementApiToken: checkedEnv.AUTH0_MANAGEMENT_API_TOKEN,
            Auth0ManagementEndpoint: checkedEnv.AUTH0_MANAGEMENT_ENDPOINT,
        };
        Object.keys(config).forEach(element => {
            if (element.indexOf("Pass") < 0) {
                console.log('Created config', element, (config as any)[element]);    
            }
        });
    }
    return config;
}