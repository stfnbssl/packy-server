"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
async function getRepositories(accessToken) {
    return node_fetch_1.default(`https://api.github.com/user/repos`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
        console.log('getRepositories.responseData', responseData);
        return responseData;
    });
}
exports.getRepositories = getRepositories;
function getOptions(accessToken) {
    return {
        method: 'GET',
        headers: headers(accessToken)
    };
}
function postOptions(accessToken) {
    return {
        method: 'POST',
        headers: headers(accessToken)
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