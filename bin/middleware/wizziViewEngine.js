"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const wizzi_1 = require("../features/wizzi");
exports.WizziViewEngineMiddleware = (app) => {
    app.engine('ittf', function (filePath, options, callback) {
        const context = Object.assign({}, options, { locals: options._locals });
        console.log('WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2));
        wizzi_1.wizziProds.generateArtifactFs(filePath, context).then(generated => {
            callback(null, generated.artifactContent);
        }).catch(err => {
            callback(err);
        });
    });
    app.set('views', path.resolve(__dirname, '..', 'site', 'views')); // specify the views directory
    app.set('view engine', 'ittf'); // register the template engine
};
//# sourceMappingURL=wizziViewEngine.js.map