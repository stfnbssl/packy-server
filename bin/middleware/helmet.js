"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet = require("helmet");
exports.HelmetMiddleware = (app) => {
    app.use(helmet());
};
//# sourceMappingURL=helmet.js.map