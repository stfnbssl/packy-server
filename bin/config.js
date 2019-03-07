"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    let checkedEnv = envalid_1.cleanEnv(process.env, {
        PORT: envalid_1.port(),
        PACKY_TEMPLATES_FOLDER: envalid_1.str(),
        AUTH0_DOMAIN: envalid_1.str(),
        AUTH0_CLIENT_ID: envalid_1.str(),
        AUTH0_CLIENT_SECRET: envalid_1.str(),
        AUTH0_CALLBACK_URL: envalid_1.str(),
        AUTH0_MANAGEMENT_API_TOKEN: envalid_1.str(),
        AUTH0_MANAGEMENT_ENDPOINT: envalid_1.str(),
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
            Auth0Domain: checkedEnv.AUTH0_DOMAIN,
            Auth0ClientId: checkedEnv.AUTH0_CLIENT_ID,
            Auth0ClientSecret: checkedEnv.AUTH0_CLIENT_SECRET,
            Auth0CallbackUrl: checkedEnv.AUTH0_CALLBACK_URL,
            Auth0ManagementApiToken: checkedEnv.AUTH0_MANAGEMENT_API_TOKEN,
            Auth0ManagementEndpoint: checkedEnv.AUTH0_MANAGEMENT_ENDPOINT,
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
//# sourceMappingURL=config.js.map