"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packyTypes = require("./types");
exports.packyTypes = packyTypes;
const user_1 = require("./mongo/user");
const packy_1 = require("./mongo/packy");
const templates_1 = require("./controllers/templates");
const productions_1 = require("./controllers/productions");
const packyModels = {
    UserModel: user_1.UserModel,
    PackyModel: packy_1.PackyModel
};
exports.packyModels = packyModels;
const packyModelBuilders = [
    user_1.UserModelBuilder,
    packy_1.PackyModelBuilder
];
exports.packyModelBuilders = packyModelBuilders;
const packyControllers = [
    new templates_1.TemplatesController(),
    new productions_1.ProductionsController()
];
exports.packyControllers = packyControllers;
//# sourceMappingURL=index.js.map