"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const response_1 = require("../../../utils/response");
var jsonParser = bodyParser.json();
class TemplatesController {
    constructor() {
        this.path = '/api/templates';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.fsDb = initValues.fsDb;
            this.router.get(this.path, this.getAllTemplates);
            this.router.get(`${this.path}/:id`, this.getTemplateById);
        };
        this.getAllTemplates = async (request, response) => {
            response_1.sendPromiseResult(response, this.fsDb.getPackyTemplatesList());
        };
        this.getTemplateById = async (request, response) => {
            const id = request.params.id;
            const template = await this.fsDb.getPackyTemplate(id);
            response_1.sendSuccess(response, template);
        };
    }
}
exports.TemplatesController = TemplatesController;
//# sourceMappingURL=templates.js.map