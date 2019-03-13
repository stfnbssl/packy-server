"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const path = require("path");
const git = require("isomorphic-git");
const memfs_1 = require("memfs");
//import { fs } from 'memfs';
const wizzi_utils_1 = require("wizzi-utils");
const volume = new memfs_1.Volume;
const fs = memfs_1.createFsFromVolume(volume);
fs.kind = 'filesystem';
const wizzifs = wizzi_utils_1.vfile(fs);
// const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
async function getRepositories(accessToken) {
    return node_fetch_1.default(`https://api.github.com/user/repos`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getRepositories.responseData', responseData);
        return responseData;
    });
}
exports.getRepositories = getRepositories;
async function getRepository(owner, repo, accessToken) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}`, getOptions(accessToken))
        .then((response) => response.json())
        .then(async (responseData) => {
        console.log('getRepository.responseData', responseData);
        responseData._revisions = await getRevisions(owner, repo, accessToken);
        responseData._commits = await getCommits(owner, repo, accessToken);
        responseData._contents = await getContents(owner, repo, accessToken);
        return responseData;
    });
}
exports.getRepository = getRepository;
async function createRepository(accessToken, options) {
    return node_fetch_1.default(`https://api.github.com/user/repos`, postOptions(accessToken, options))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('createRepository.responseData', responseData);
        return responseData;
    });
}
exports.createRepository = createRepository;
async function getRevisions(owner, repo, accessToken) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getRevisions.responseData', responseData);
        return responseData;
    });
}
exports.getRevisions = getRevisions;
async function getBranches(owner, repo, accessToken) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}/branches`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getBranches.responseData', responseData);
        return responseData;
    });
}
exports.getBranches = getBranches;
async function createBranch(accessToken, owner, repo, options) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}/git/refs`, postOptions(accessToken, {
        ref: `refs/heads/${options.name}>`,
        sha: options.revisionFromHash
    }))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('createBranch.responseData', responseData);
        return responseData;
    });
}
exports.createBranch = createBranch;
async function cloneBranch(repo, branch = 'master') {
    volume.reset();
    const dir = '/' + repo.name;
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, async (err) => {
            if (err) {
                return reject(err);
            }
            await git.clone({
                fs,
                dir,
                url: `https://github.com/${repo.owner}/${repo.name}`,
                ref: `${branch}`,
                singleBranch: true,
                depth: 10
            });
            let files = wizzifs.getFiles(dir, { deep: true, documentContent: true });
            const packies = {};
            files.forEach(file => {
                packies[file.relPath] = {
                    type: "CODE",
                    contents: file.content
                };
            });
            const log = await git.log({
                fs,
                dir
            });
            resolve({
                files: packies,
                commitHistory: log
            });
        });
    });
}
exports.cloneBranch = cloneBranch;
async function updateBranch(packyFiles, repo, branch = 'master') {
    volume.reset();
    const dir = '/' + repo.name;
    fs.mkdir(dir, async (err) => {
        await git.clone({
            fs,
            dir,
            url: `https://github.com/${repo.owner}/${repo.name}`,
            ref: `${branch}`,
            singleBranch: true,
            depth: 10
        });
        let files = fs.readdirSync(dir);
        console.log('updateBranch - cloned files', files);
        /*
        Object.keys(packyFiles).forEach(filePath=> {
            if (packyFiles[filePath].type === "CODE") {
                fs.writeFileSync(path.join(dir, filePath), packyFiles[filePath].contents);
            }
        })
        */
        // let msg = await git.log({fs, dir});
        // console.log(msg);
        filesDiff(dir, packyFiles, async (err, result) => {
            // console.log ('updateBranch - diff', result);
            Object.keys(result).forEach(entryName => {
                if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                    console.log('updateBranch - write file', path.join(dir, entryName));
                    fs.writeFileSync(path.join(dir, entryName), result[entryName].b.content);
                }
                else {
                    if (['.gitignore', 'LICENSE', 'README.md'].indexOf(entryName) < 0) {
                        console.log('updateBranch - delete file', path.join(dir, entryName));
                        fs.unlinkSync(path.join(dir, entryName));
                    }
                }
            });
            console.log('updateBranch - 1 - status of files in work area');
            await printStatus(dir);
            Object.keys(result).forEach(async (entryName) => {
                if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                    await git.add({ fs, dir, filepath: entryName });
                }
                else {
                    if (['.gitignore', 'LICENSE', 'README.md'].indexOf(entryName) < 0) {
                        await git.remove({ fs, dir, filepath: entryName });
                    }
                }
            });
            console.log('updateBranch - 2 - status of files in work area');
            await printStatus(dir);
            let msg = await git.commit({
                fs,
                dir,
                message: 'Packy git export ' + new Date().toDateString(),
                author: {
                    name: 'packy',
                    email: 'packy@gmail.com'
                }
            });
            console.log(msg);
            await printStatus(dir);
            // let msg = await git.listFiles({fs, dir});
            // console.log('updateBranch - listFiles after diff writes', msg);
            let pushResponse = await git.push({
                fs,
                dir,
                remote: 'origin',
                ref: 'master',
                username: repo.owner,
                password: repo.password,
                token: repo.token,
            });
            console.log(pushResponse);
        });
    });
}
exports.updateBranch = updateBranch;
async function getCommits(owner, repo, accessToken) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}/commits`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getCommits.responseData', responseData);
        return responseData;
    });
}
exports.getCommits = getCommits;
async function getContents(owner, repo, accessToken) {
    return node_fetch_1.default(`https://api.github.com/repos/${owner}/${repo}/contents`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getContents.responseData', responseData);
        return responseData;
    });
}
exports.getContents = getContents;
function filesDiff(dir, packyFiles, callback) {
    wizzifs.getFiles(dir, { deep: true, documentContent: true }, (err, result) => {
        const diff = {};
        result.forEach(entry => {
            if (entry.relPath.startsWith('.git/') == false) {
                console.log('diff -', entry.relPath);
                diff[entry.relPath] = { kind: '-', a: { path: entry.relPath, content: entry.content } };
            }
        });
        Object.keys(packyFiles).forEach(entryName => {
            if (diff[entryName]) {
                if (diff[entryName].a && diff[entryName].a.content === packyFiles[entryName].contents) {
                    console.log('delete', entryName);
                    delete diff[entryName];
                }
                else {
                    console.log('diff <>', entryName);
                    diff[entryName].kind = '<>';
                    diff[entryName].b = { path: entryName, content: packyFiles[entryName].contents };
                }
            }
            else {
                console.log('diff +', entryName);
                diff[entryName] = { kind: '+', b: { path: entryName, content: packyFiles[entryName].contents } };
            }
        });
        callback(null, diff);
    });
}
async function printStatus(dir) {
    return new Promise((resolve, reject) => {
        wizzifs.getFiles(dir, { deep: true, documentContent: false }, async (err, files) => {
            if (err) {
                return reject(err);
            }
            for (let file of files) {
                if (file.relPath.startsWith('.git/') == false) {
                    let msg = await git.status({ fs, dir, filepath: file.relPath });
                    console.log('path', file.relPath, 'status', msg);
                }
            }
            ;
            resolve();
        });
    });
}
function getOptions(accessToken) {
    return {
        method: 'GET',
        headers: headers(accessToken)
    };
}
function postOptions(accessToken, body) {
    return {
        method: 'POST',
        headers: headers(accessToken),
        body: JSON.stringify(body),
    };
}
function headers(accessToken) {
    return {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': 'token ' + accessToken,
    };
}
//# sourceMappingURL=apicalls.js.map