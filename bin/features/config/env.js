"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    let checkedEnv = envalid_1.cleanEnv(process.env, {
        PORT: envalid_1.port(),
        SESSION_SECRET: envalid_1.str(),
        PACKY_TEMPLATES_FOLDER: envalid_1.str(),
        MONGO_PASSWORD: envalid_1.str(),
        MONGO_PATH: envalid_1.str(),
        MONGO_USER: envalid_1.str(),
        AUTH0_DOMAIN: envalid_1.str(),
        AUTH0_PACKY_CLIENT_ID: envalid_1.str(),
        AUTH0_PACKY_CLIENT_SECRET: envalid_1.str(),
        AUTH0_PACKY_CALLBACK_URL: envalid_1.str(),
        AUTH0_PACKY_API_ID: envalid_1.str(),
        AUTH0_PACKY_BACKEND_APP_ID: envalid_1.str(),
        AUTH0_PACKY_BACKEND_APP_SECRET: envalid_1.str(),
    });
    return checkedEnv;
}
exports.packyFilePrefix = 'json:/';
let config;
function create() {
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
                console.log('Created config', element, config[element]);
            }
        });
    }
    return config;
}
exports.default = create;
//# sourceMappingURL=env.js.map