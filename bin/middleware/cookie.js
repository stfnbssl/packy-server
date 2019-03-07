"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
exports.CookieMiddleware = (app) => {
    app.use(cookieParser());
};
//# sourceMappingURL=cookie.js.map