"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packyTypes = require("./types");
exports.packyTypes = packyTypes;
const templates_1 = require("./controllers/templates");
const productions_1 = require("./controllers/productions");
const packyControllers = [
    new templates_1.TemplatesController(),
    new productions_1.ProductionsController()
];
exports.packyControllers = packyControllers;
//# sourceMappingURL=index.js.map