import * as path from 'path';
import * as wizzi from 'wizzi';
import { packyTypes } from '../packy';
import { createFsJsonAndFactory, ensurePackyFilePrefix, createFilesystemFactory } from './factory';
import { GeneratedArtifact } from './types';
import { FsJson } from 'wizzi-repo';


export async function generateArtifact(filePath: string, files: packyTypes.PackyFiles): Promise<GeneratedArtifact> {
    return new Promise(async (resolve, reject)=> {
        const generator = generatorFor(filePath);
        if (generator) {
            const ittfDocumentUri = ensurePackyFilePrefix(filePath);
            console.log('using artifact generator', generator);
            const jsonwf = await createFsJsonAndFactory(files);
            jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {}, generator, (err, result) =>{
                if (err) { return reject(err); }
                console.log('Generated artifact', result);
                resolve({ 
                    artifactContent: result, sourcePath: filePath, artifactGenerator: generator
                })
            })
        } else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}

export async function loadModelFs(filePath: string, context: any): Promise<wizzi.WizziModel> {
    return new Promise(async (resolve, reject)=> {
        const schemaName = schemaFromFilePath(filePath);
        if (!schemaName) {
            return reject('File is not a known ittf document: ' + filePath);
        }
        const wf = await createFilesystemFactory();
        wf.loadModel(schemaName, filePath, {mTreeBuildUpContext: context}, (err, result) =>{
            if (err) { return reject(err); }
            // console.log('Generated artifact', result);
            resolve(result);
        })
    });
}

export async function generateArtifactFs(filePath: string, context?: any): Promise<GeneratedArtifact> {
    return new Promise(async (resolve, reject)=> {
        const generator = generatorFor(filePath);
        if (generator) {
            console.log('using artifact generator', generator);
            const wf = await createFilesystemFactory();
            const generationContext = { 
                modelRequestContext: { 
                    mTreeBuildUpContext: context || {}
                } 
            };
            wf.loadModelAndGenerateArtifact(filePath, generationContext, generator, (err, result) =>{
                if (err) { return reject(err); }
                console.log('Generated artifact', result);
                resolve({ 
                    artifactContent: result, sourcePath: filePath, artifactGenerator: generator
                })
            })
        } else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}

export async function executeJob(filePath: string, files: packyTypes.PackyFiles): Promise<FsJson> {
    return new Promise(async (resolve, reject)=> {
        const ittfDocumentUri = ensurePackyFilePrefix(filePath);
        const jsonwf = await createFsJsonAndFactory(files);
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

export async function executeJobs(files: packyTypes.PackyFiles): Promise<FsJson> {
    return new Promise(async (resolve, reject)=> {
        const jobDocumentUris = Object.keys(files).filter(k=> k.endsWith('.wfjob.ittf'));
        console.log('Executing jobs', jobDocumentUris);
        const jsonwf = await createFsJsonAndFactory(files);
        const execJob = (index: number): void => {
            if (index == jobDocumentUris.length) {
                console.log('Jobs executed.');
                return resolve(jsonwf.fsJson);
            }
            const ittfDocumentUri = ensurePackyFilePrefix(jobDocumentUris[index]);
            console.log('Executing job', ittfDocumentUri);
            jsonwf.wf.executeJob({ 
                name: '', 
                path: ittfDocumentUri, 
                productionOptions: {}
            },
            (err, result) => {
                if (err) { return reject(err); }
                console.log('Job executed. result', result);
                execJob(index+1);
            });
        }
        execJob(0);
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

function schemaFromFilePath(filePath: string): string | undefined {
    const nameParts = path.basename(filePath).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return nameParts[nameParts.length-2];
    }
    return undefined;
}