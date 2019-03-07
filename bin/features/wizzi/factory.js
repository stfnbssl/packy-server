"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const wizzi = require("wizzi");
const wizzi_repo_1 = require("wizzi-repo");
const config_1 = require("../../config");
function packyFilesToJsonDocuments(files) {
    const jsonDocuments = [];
    Object.keys(files).map(value => {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents });
        }
    });
    return jsonDocuments;
}
exports.packyFilesToJsonDocuments = packyFilesToJsonDocuments;
async function createFilesystemFactory() {
    return new Promise((resolve, reject) => {
        wizzi.fsFactory({
            plugins: {
                items: [
                    'wizzi-core',
                    'wizzi-js',
                    'wizzi-web',
                ]
            }
        }, function (err, wf) {
            if (err) {
                return reject(err);
            }
            resolve(wf);
        });
    });
}
exports.createFilesystemFactory = createFilesystemFactory;
async function createFsJsonAndFactory(files) {
    const plugins = [];
    const jsonDocuments = [];
    Object.keys(files).map(value => {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents });
            const plugin = pluginFor(filePath);
            if (plugin && plugins.indexOf(plugin) < 0) {
                plugins.push(plugin);
            }
        }
    });
    console.log('createFactory', plugins, jsonDocuments);
    return new Promise((resolve, reject) => {
        wizzi_repo_1.JsonComponents.createFsJson(jsonDocuments, (err, fsJson) => {
            if (err) {
                return reject(err);
            }
            wizzi.jsonFactory({
                fsJson: fsJson,
                plugins: {
                    items: plugins
                }
            }, function (err, wf) {
                if (err) {
                    return reject(err);
                }
                resolve({
                    wf, fsJson
                });
            });
        });
    });
}
exports.createFsJsonAndFactory = createFsJsonAndFactory;
async function createFsJson(files) {
    const jsonDocuments = [];
    Object.keys(files).map(value => {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents });
        }
    });
    console.log('createFsJson', jsonDocuments);
    return new Promise((resolve, reject) => {
        wizzi_repo_1.JsonComponents.createFsJson(jsonDocuments, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
exports.createFsJson = createFsJson;
async function extractGeneratedFiles(fsJson) {
    const files = {};
    return new Promise((resolve, reject) => {
        fsJson.toFiles({ removeRoot: config_1.packyFilePrefix }, (err, result) => {
            if (err) {
                reject(err);
            }
            result.forEach(value => {
                if (value.relPath.endsWith('.ittf') == false) {
                    files[value.relPath] = {
                        type: 'CODE',
                        contents: value.content,
                        generated: true,
                    };
                }
            });
            resolve(files);
        });
    });
}
exports.extractGeneratedFiles = extractGeneratedFiles;
const schemaPluginMap = {
    json: 'wizzi-core',
    text: 'wizzi-core',
    xml: 'wizzi-core',
    ittf: 'wizzi-core',
    wfjob: 'wizzi-core',
    wfschema: 'wizzi-core',
    js: 'wizzi-js',
    ts: 'wizzi-js',
    html: 'wizzi-web',
    css: 'wizzi-web',
    scss: 'wizzi-web',
    graphql: 'wizzi-web',
    vml: 'wizzi-web',
    vue: 'wizzi-web',
};
function pluginFor(file) {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return schemaPluginMap[nameParts[nameParts.length - 2]];
    }
    return undefined;
}
function ensurePackyFilePrefix(filePath) {
    return filePath.startsWith(config_1.packyFilePrefix) ? filePath : config_1.packyFilePrefix + filePath;
}
exports.ensurePackyFilePrefix = ensurePackyFilePrefix;
//# sourceMappingURL=factory.js.map