import * as path from 'path';
import * as wizzi from 'wizzi';
import { packyTypes } from '../packy';
import { createFactory, ensurePackyFilePrefix } from './factory';
import { FsJson } from 'wizzi-repo';

export async function generateArtifact(filePath: string, files: packyTypes.PackyFiles): Promise<string> {
    return new Promise(async (resolve, reject)=> {
        const generator = generatorFor(filePath);
        if (generator) {
            const ittfDocumentUri = ensurePackyFilePrefix(filePath);
            console.log('using artifact generator', generator);
            const jsonwf = await createFactory(files);
            jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {}, generator, (err, result) =>{
                if (err) { return reject(err); }
                console.log('Generated artifact', result);
                resolve(result);
            })
        } else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}

export async function executeJob(filePath: string, files: packyTypes.PackyFiles): Promise<FsJson> {
    return new Promise(async (resolve, reject)=> {
        const ittfDocumentUri = ensurePackyFilePrefix(filePath);
        const jsonwf = await createFactory(files);
        jsonwf.wf.executeJob({ 
            name: '', 
            path: ittfDocumentUri, 
            productionOptions: {}},
            (err, result) =>{
                if (err) { return reject(err); }
                console.log('Job executed. result', result);
                resolve(jsonwf.fsJson);
            })
        });
}

const schemaModuleMap: {[k: string]: string} = {
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
}

function generatorFor(file: string): string | undefined {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return schemaModuleMap[nameParts[nameParts.length-2]];
    }
    return undefined;
}