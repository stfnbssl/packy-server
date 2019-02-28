import * as path from 'path';
import * as wizzi from 'wizzi';
import { JsonComponents, JsonDocumentDto, FsJson } from 'wizzi-repo';
import { packyFilePrefix } from '../../config';
import { packyTypes } from '../packy';
import { JsonWizziFactory } from './types';

export async function createFactory(files: packyTypes.PackyFiles): Promise<JsonWizziFactory> {
    const plugins: string[] = [];
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map(value=> {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents});
            const plugin = pluginFor(filePath);
            if (plugin && plugins.indexOf(plugin) < 0) {
                plugins.push(plugin);
            }
        }
    });
    console.log('createFactory', plugins, jsonDocuments);
    return new Promise((resolve, reject)=>{
        JsonComponents.createFsJson(jsonDocuments, (err, fsJson) =>{
            if (err) { return reject(err); }
            wizzi.jsonFactory({
                fsJson: fsJson,
                plugins: {
                    items: plugins
                }
            }, function(err, wf) {
                if (err) { return reject(err); }
                resolve({
                    wf, fsJson
                });
            });
        });
    });
}

export async function createFsJson(files: packyTypes.PackyFiles): Promise<FsJson> {
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map(value=> {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents});
        }
    });
    console.log('createFsJson', jsonDocuments);
    return new Promise((resolve, reject)=>{
        JsonComponents.createFsJson(jsonDocuments, (err, result) =>{
            if (err) { return reject(err); }
            resolve(result);
        });
    });
}

const schemaPluginMap: {[k: string]: string} = {
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
}

function pluginFor(file: string): string | undefined {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return schemaPluginMap[nameParts[nameParts.length-2]];
    }
    return undefined;
}

export function ensurePackyFilePrefix(filePath: string) {
    return filePath.startsWith(packyFilePrefix) ? filePath : packyFilePrefix + filePath;
}
