"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./features/config");
const filesystem_1 = require("./db/filesystem");
const mongodb_1 = require("./db/mongodb");
const site_1 = require("./site");
const account_1 = require("./features/account");
const auth0_1 = require("./features/auth0");
const packy_1 = require("./features/packy");
const middleware_1 = require("./middleware");
const App_1 = require("./App");
async function start() {
    const fsDb = await filesystem_1.default(config_1.config);
    let modelBuilders = [
        ...packy_1.packyModelBuilders
    ];
    mongodb_1.default(config_1.config, modelBuilders);
    let controllers = [
        ...site_1.siteControllers,
        ...account_1.accountControllers,
        ...auth0_1.auth0Controllers,
        ...packy_1.packyControllers,
    ];
    const middlewares = middleware_1.appMiddlewares.concat();
    const appInitializer = {
        config: config_1.config,
        controllers,
        middlewares,
        fsDb,
        auth0Secured: middleware_1.auth0Secured
    };
    const app = new App_1.default(appInitializer);
    app.listen();
}
try {
    start();
}
catch (ex) {
    console.log(ex);
}
//# sourceMappingURL=server.js.map