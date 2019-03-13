"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const globalConfigPath = path.join(__dirname, 'globalConfig.json');
const mongod = new mongodb_memory_server_1.MongoMemoryServer({
    autoStart: false,
});
module.exports = async () => {
    if (!mongod.isRunning) {
        await mongod.start();
    }
    const mongoConfig = {
        mongoDBName: 'jest',
        mongoUri: await mongod.getConnectionString(),
    };
    // Write global config to disk because all tests run in different contexts.
    fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;
};
//# sourceMappingURL=global-setup.js.map