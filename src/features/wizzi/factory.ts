import * as path from 'path';
import * as wizzi from 'wizzi';
import { JsonComponents, JsonDocumentDto, FsJson } from 'wizzi-repo';
import { packyFilePrefix } from '../config/env';
import { packyTypes } from '../packy';
import { JsonWizziFactory, FilesystemWizziFactory } from './types';

export function packyFilesToJsonDocuments(files: packyTypes.PackyFiles): JsonDocumentDto[] {
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map(value=> {
        if (files[value].type === 'CODE') {
            const filePath = ensurePackyFilePrefix(value);
            jsonDocuments.push({ path: filePath, content: files[value].contents});
        }
    });
    return jsonDocuments;
}

export async function createFilesystemFactory(): Promise<wizzi.WizziFactory> {
    return new Promise((resolve, reject)=>{
        wizzi.fsFactory({
            plugins: {
                items: [
                    'wizzi-core',
                    'wizzi-js',
                    'wizzi-web',
                ]
            }
        }, function(err, wf) {
            if (err) { return reject(err); }
            resolve(wf);
        });
    });
}

export async function createFsJsonAndFactory(files: packyTypes.PackyFiles): Promise<JsonWizziFactory> {
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

export async function extractGeneratedFiles(fsJson: FsJson): Promise<packyTypes.PackyFiles> {
    const files: packyTypes.PackyFiles = {};
    return new Promise((resolve, reject)=>{
        fsJson.toFiles({ removeRoot: packyFilePrefix }, (err, result)=>{
            if (err) { reject(err); }
            result.forEach(value=>{
                if (value.relPath.endsWith('.ittf') == false) {
                    files[value.relPath] = {
                        type: 'CODE',
                        contents: value.content as string,
                        generated: true,
                    };
                }
            })
            resolve(files);
        });
    })
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
