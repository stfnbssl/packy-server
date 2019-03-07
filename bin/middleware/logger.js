"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = (app) => {
    app.use((request, response, next) => {
        console.log(`${request.method} ${request.path}`);
        next();
    });
};
//# sourceMappingURL=logger.js.map