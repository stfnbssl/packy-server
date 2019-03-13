"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
exports.CompressionMiddleware = (app) => {
    app.use(compression());
};
//# sourceMappingURL=compression.js.map