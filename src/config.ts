import { cleanEnv, str, port } from 'envalid';
import { ConfigType } from './types';

function validateEnv() {
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(),
        PACKY_TEMPLATES_FOLDER: str(),
    });
    return checkedEnv;
}

export const packyFilePrefix = 'json://';

let config: ConfigType;

export default function create(): ConfigType {
    if (config == null) {
        const checkedEnv = validateEnv();
        config = {
            port: checkedEnv.PORT,
            packyTemplatesFolder: checkedEnv.PACKY_TEMPLATES_FOLDER,
        };
        Object.keys(config).forEach(element => {
            if (element.indexOf("Pass") < 0) {
                console.log('Created config', element, (config as any)[element]);    
            }
        });
    }
    return config;
}