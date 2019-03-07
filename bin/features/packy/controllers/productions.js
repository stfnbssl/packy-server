"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const wizzi_1 = require("../../wizzi");
const response_1 = require("../../../utils/response");
var jsonParser = bodyParser.json();
class ProductionsController {
    constructor() {
        this.path = '/api/productions';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.fsDb = initValues.fsDb;
            this.router.post(`${this.path}/artifact/:id`, this.generateArtifact);
            this.router.post(`${this.path}/job`, this.executeJob);
        };
        this.generateArtifact = async (request, response) => {
            const id = request.params.id;
            const files = request.body;
            console.log('generateArtifact.received files', JSON.stringify(files, null, 2));
            wizzi_1.wizziProds.generateArtifact(id, files).then((value) => {
                console.log('ga', value);
                response_1.sendSuccess(response, {
                    generatedArtifact: value
                });
            }).catch((err) => {
                console.log('err', err);
            });
        };
        this.executeJob = async (request, response) => {
            const files = request.body;
            console.log('ProductionsController.executeJob.received files', Object.keys(files));
            wizzi_1.wizziProds.executeJobs(files).then(async (fsJson) => {
                const files = await wizzi_1.wizziFactory.extractGeneratedFiles(fsJson);
                console.log('executeJob.generatedArtifacts', files);
                response_1.sendSuccess(response, {
                    generatedArtifacts: files
                });
            }).catch((err) => {
                console.log('err', err);
            });
        };
    }
}
exports.ProductionsController = ProductionsController;
//# sourceMappingURL=productions.js.map