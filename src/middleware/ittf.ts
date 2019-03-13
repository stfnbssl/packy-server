import * as path from 'path';
import * as fs from 'fs';
import * as parseUrl from 'parseurl';
import { Application, RequestHandler, Request, Response } from 'express';
import { MiddlewareType } from '../features/app/types';
import { wizziProds } from '../features/wizzi';
import { WizziModel } from 'wizzi';

export const IttfDocumentsMiddleware: MiddlewareType = (app: Application) => {
    console.log('IttfDocumentsMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', 'ittf'))
    app.use('/ittf', ittfMiddleware(path.resolve(__dirname, '..', '..', 'ittf'), '/ittf'));
}

const extContentTypeMap: {[k: string]: string} = {
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.scss': 'text/scss',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/x-font-ttf',
    '.txt': 'text/plain',
    '.vtt': 'text/vtt',
    '.woff': 'application/x-font-woff',
    '.yaml': 'text/yanl',
    '.yml': 'text/yanl',
    '.xml': 'text/xml',
}

function contentTypeFor(file: string): string | undefined {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return extContentTypeMap['.'+nameParts[nameParts.length-2]];
    }
    return undefined;
}

function ittfMiddleware(basePath: string, routePath: string): RequestHandler {
    return (req: Request, res: Response, next: Function): any => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
        const parsedUrl = parseUrl(req);
        if (!parsedUrl || !parsedUrl.pathname) {
            return next();
        }
        const urlPathName = decodeURIComponent(parsedUrl.pathname);
        const pathname = urlPathName; // ??? urlPathName.substr(routePath.length);
        const filePath = path.join(basePath, pathname);
        const extname = path.extname(filePath);
        console.log('ittf.pathname, pathname, filePath', urlPathName, pathname, filePath, path.extname(filePath));
        if (fs.existsSync(filePath) === false) {
            console.log('filePath do not exists', filePath);
            return next();
        }
        let contentType = contentTypeFor(filePath);
        console.log('contentType', contentType);
        if (contentType) {
            return contextLoader(filePath, req, function(err: any, modelContext: WizziModel) {            
                if (err) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    return res.end(err);
                }
                wizziProds.generateArtifactFs(filePath, modelContext).then(generated=>{
                    console.log('generated.artifactContent', generated.artifactContent);
                    res.writeHead(200, {
                        'Content-Type': contentType,
                        'Content-Length': generated.artifactContent.length
                    });
                    res.end(generated.artifactContent);
                }).catch(err=>{
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(err);
                });
            })
        }
        next();
        /*
        contentType = extContentTypeMap[extname];
        console.log('contentType', contentType);
        if (contentType) {
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': stat.size
            });
            const readStream = fs.createReadStream(filePath);
            return readStream.pipe(res);
        }
        next();
        */
    }
}

function contextLoader(resourceFilePath: string, req: Request, callback: any) {
    var contextRequest = null; // TODO req.query._context;
    if (!contextRequest) {
        var ss = path.basename(resourceFilePath).split('.');
        console.log('ittf 1', resourceFilePath);
        if (ss[ss.length-1] === 'ittf' && ss[ss.length-2] !== 'json') {
            var seedName = ss.slice(0, -2).join('.');
            console.log('ittf 2', seedName);
            var twinJsonPath = path.join(path.dirname(resourceFilePath), seedName + '.json.ittf');
            console.log('ittf 3', twinJsonPath);
            if (fs.existsSync(twinJsonPath)) {
                return(buildTwinJsonContext('mpage', twinJsonPath, callback));
            }
            else {
                return(callback(null, {}));
            }
        }
        else {
            return(callback(null, {}));
        }
    } else {
        return(callback(null, {}));
    }
}

function buildTwinJsonContext(exportName: string, twinJsonPath: string, callback: any) {
    wizziProds.loadModelFs(twinJsonPath, {})
        .then(model=> {
            callback(null, {
                [exportName]: model
            });
        })
        .catch(err=>callback(err));
}