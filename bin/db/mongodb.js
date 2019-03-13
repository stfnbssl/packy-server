"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function start(config, modelBuilders) {
    const { mongoUser, mongoPassword, mongoPath, } = config;
    const connectUrl = `mongodb://${mongoUser}:${mongoPassword}${mongoPath}`;
    console.log('Connecting to ', mongoPath);
    mongoose.connect(connectUrl);
    modelBuilders.forEach((builder) => {
        builder.buildModel();
    });
}
exports.default = start;
//# sourceMappingURL=mongodb.js.map