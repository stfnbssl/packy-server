"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    let checkedEnv = envalid_1.cleanEnv(process.env, {
        PORT: envalid_1.port(),
        PACKY_TEMPLATES_FOLDER: envalid_1.str(),
    });
    return checkedEnv;
}
exports.packyFilePrefix = 'json://';
let config;
function create() {
    if (config == null) {
        const checkedEnv = validateEnv();
        config = {
            port: checkedEnv.PORT,
            packyTemplatesFolder: checkedEnv.PACKY_TEMPLATES_FOLDER,
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