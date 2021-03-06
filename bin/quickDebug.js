"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./features/wizzi/factory");
const productions_1 = require("./features/wizzi/productions");
const github_1 = require("./features/github");
async function testCloneGithubRepo() {
    const result = await github_1.githubApiCalls.cloneBranch({ name: 'packy-demo-strawberry', owner: 'stfnbssl', token: '' }, 'master');
    console.log('testCloneGithubRepo', result);
}
async function testUpdateGithubRepo(files) {
}
async function testFactory() {
    const wf = await factory_1.createFsJsonAndFactory({
        'x/d/a.js.ittf': { type: 'CODE', contents: 'Hey' },
        'x/d/b.html.ittf': { type: 'CODE', contents: 'Hey' },
    });
    console.log(wf);
}
async function testArtifactGenerator() {
    const wf = await productions_1.generateArtifact('x/a.js.ittf', {
        'x/a.js.ittf': { type: 'CODE', contents: 'module\n\tkind jsfile\n\tb()' },
        'x/t/b.js.ittf': { type: 'CODE', contents: 'log "Hello"' },
    });
    console.log(wf);
}
async function testWizziJob() {
    const wf = await productions_1.executeJob('x/gen.wfjob.ittf', {
        'x/src/a.js.ittf': { type: 'CODE', contents: 'module\n\tkind jsfile\n\tb()' },
        'x/src/t/b.js.ittf': { type: 'CODE', contents: 'log "Hello"' },
        'x/gen.wfjob.ittf': { type: 'CODE', contents: `wfjob

    $
        var ittf_src_folder        = path.join(__dirname, 'src');
        var dest_folder            = path.join(__dirname, '..', 'src');


    line src
        cwd-folder x{ittf_src_folder}

        artifact javascript modules
            src ./**/*.js.ittf
            schema js
            generator js/module
            extension js

    production
        dest-folder x{dest_folder}
        line-ref src

            `.replace(/x{/g, '${') },
    });
    console.log(wf.toJson((err, result) => {
        console.log(JSON.stringify(result, null, 2));
    }));
}
// testWizziJob();
testCloneGithubRepo();
//# sourceMappingURL=quickDebug.js.map