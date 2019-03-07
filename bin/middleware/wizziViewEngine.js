"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wizzi_1 = require("../features/wizzi");
exports.WizziViewEngineMiddleware = (app) => {
    app.engine('ittf', function (filePath, options, callback) {
        wizzi_1.wizziProds.generateArtifact(filePath, {}).then(content => {
            callback(null, content);
        }).catch(err => {
            callback(err);
        });
    });
    app.set('views', './views'); // specify the views directory
    app.set('view engine', 'ittf'); // register the template engine
};
var fs = require('fs'); // this engine requires the fs module
//# sourceMappingURL=wizziViewEngine.js.map