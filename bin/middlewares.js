"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerMiddleware = (app) => {
    app.use((request, response, next) => {
        console.log(`${request.method} ${request.path}`);
        next();
    });
};
const middlewares = [
    LoggerMiddleware
];
exports.default = middlewares;
//# sourceMappingURL=middlewares.js.map