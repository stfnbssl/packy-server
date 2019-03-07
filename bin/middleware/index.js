"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const wizziViewEngine_1 = require("./wizziViewEngine");
const middlewares = [
    logger_1.LoggerMiddleware,
    wizziViewEngine_1.WizziViewEngineMiddleware
];
exports.default = middlewares;
//# sourceMappingURL=index.js.map