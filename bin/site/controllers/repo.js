"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const github_1 = require("../../features/github");
class RepoController {
    constructor() {
        this.path = '/repo';
        this.router = express_1.Router();
        this.initialize = (initValues) => {
            this.router.get(`${this.path}/list`, initValues.auth0Secured(), this.list);
            this.router.get(`${this.path}/view/:owner/:repo`, initValues.auth0Secured(), this.view);
            this.router.get(`${this.path}/clone/:owner/:repo`, initValues.auth0Secured(), this.clone);
        };
        this.list = async (request, response, next) => {
            const repos = await github_1.githubApiCalls.getRepositories(request.session.github_accessToken);
            const _a = request.user, { _raw, _json } = _a, user = __rest(_a, ["_raw", "_json"]);
            response.render('repo/list.html.ittf', {
                user: user,
                userProfile: JSON.stringify(user, null, 2),
                repos: repos,
                title: 'Repositories page'
            });
        };
        this.view = async (request, response, next) => {
            const repo = await github_1.githubApiCalls.getRepository(request.params.owner, request.params.repo, request.session.github_accessToken);
            const _a = request.user, { _raw, _json } = _a, user = __rest(_a, ["_raw", "_json"]);
            response.render('repo/view.html.ittf', {
                user: user,
                userProfile: JSON.stringify(user, null, 2),
                repo: repo,
                title: 'Repository page'
            });
        };
        this.clone = async (request, response, next) => {
            const clonedBranch = await github_1.githubApiCalls.cloneBranch({
                name: request.params.repo,
                owner: request.params.owner,
                token: request.session.github_accessToken
            }, 'master');
            const _a = request.user, { _raw, _json } = _a, user = __rest(_a, ["_raw", "_json"]);
            response.render('repo/clone.html.ittf', {
                user: user,
                userProfile: JSON.stringify(user, null, 2),
                repo: request.params.repo,
                cloned: clonedBranch.files,
                commitHistory: clonedBranch.commitHistory,
                title: 'Repository page'
            });
        };
    }
}
exports.RepoController = RepoController;
//# sourceMappingURL=repo.js.map