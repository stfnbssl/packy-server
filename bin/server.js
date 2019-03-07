"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const filesystem_1 = require("./db/filesystem");
const site_1 = require("./site");
const account_1 = require("./features/account");
const packy_1 = require("./features/packy");
const middleware_1 = require("./middleware");
const App_1 = require("./App");
async function start() {
    const config = config_1.default();
    const fsDb = await filesystem_1.default(config);
    let controllers = [
        ...site_1.siteControllers,
        ...account_1.accountControllers,
        ...packy_1.packyControllers,
    ];
    const middlewares = middleware_1.default.concat();
    const appInitializer = {
        config,
        controllers,
        middlewares,
        fsDb
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