"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wizzi_repo_1 = require("wizzi-repo");
const path = require("path");
let vfile;
let docman;
let packyTemplatesJsonUri = 'json://root/packy/templates';
async function start(config) {
    const { packyTemplatesFolder, } = config;
    var packyTemplatesPath = path.join(__dirname, '..', '..', packyTemplatesFolder);
    console.log('Packy templates path: ', packyTemplatesPath);
    return new Promise((resolve, rejects) => {
        wizzi_repo_1.JsonComponents.createFsJson([], (err, fsJson) => {
            if (err) {
                rejects(err);
            }
            ;
            console.log('created FsJson');
            wizzi_repo_1.jsonfile({ fsJson: fsJson }, (err, result) => {
                vfile = result;
                console.log('created json vfile');
                docman = wizzi_repo_1.JsonComponents.createDocumentManager(fsJson);
                docman.uploadFolder(packyTemplatesPath, packyTemplatesJsonUri, (err, result) => {
                    if (err) {
                        rejects(err);
                    }
                    ;
                    const list = FsDbDriver.getPackyTemplatesList();
                    list.then(value => {
                        console.log('At start got packy templates', value);
                        resolve(FsDbDriver);
                    }).catch(err => {
                        console.log('Error retrieving packy templates', err);
                    });
                });
            });
        });
    });
}
exports.default = start;
const FsDbDriver = {
    getPackyTemplatesList: async function () {
        return new Promise((resolve, rejects) => {
            vfile.getFolders(packyTemplatesJsonUri, { deep: false }, (err, result) => {
                if (err) {
                    rejects(err);
                }
                const ret = [];
                result.forEach((item) => {
                    ret.push(item.relPath);
                });
                resolve(ret);
            });
        });
    },
    getPackyTemplate: async function (id) {
        return new Promise((resolve, rejects) => {
            vfile.getFiles(packyTemplatesJsonUri, { deep: true, documentContent: true }, (err, result) => {
                if (err) {
                    rejects(err);
                }
                resolve(result);
            });
        });
    }
};
//# sourceMappingURL=filesystem.js.map