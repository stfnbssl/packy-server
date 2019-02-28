"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const factory_1 = require("./factory");
async function generateArtifact(filePath, files) {
    return new Promise(async (resolve, reject) => {
        const generator = generatorFor(filePath);
        if (generator) {
            const ittfDocumentUri = factory_1.ensurePackyFilePrefix(filePath);
            console.log('using artifact generator', generator);
            const jsonwf = await factory_1.createFactory(files);
            jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {}, generator, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Generated artifact', result);
                resolve(result);
            });
        }
        else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}
exports.generateArtifact = generateArtifact;
async function executeJob(filePath, files) {
    return new Promise(async (resolve, reject) => {
        const ittfDocumentUri = factory_1.ensurePackyFilePrefix(filePath);
        const jsonwf = await factory_1.createFactory(files);
        jsonwf.wf.executeJob({
            name: '',
            path: ittfDocumentUri,
            productionOptions: {}
        }, (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log('Job executed. result', result);
            resolve(jsonwf.fsJson);
        });
    });
}
exports.executeJob = executeJob;
const schemaModuleMap = {
    json: 'json/document',
    text: 'text/document',
    xml: 'xml/document',
    ittf: 'ittf/document',
    js: 'js/module',
    ts: 'ts/module',
    html: 'html/document',
    css: 'css/document',
    scss: 'scss/document',
    graphql: 'graphql/document',
    vml: 'vml/document',
    vue: 'vue/document',
};
function generatorFor(file) {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return schemaModuleMap[nameParts[nameParts.length - 2]];
    }
    return undefined;
}
//# sourceMappingURL=productions.js.map