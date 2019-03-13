"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const config_1 = require("../config");
function getManagementApiToken() {
    return getApiToken(`https://${config_1.config.Auth0Domain}/api/v2/`);
}
exports.getManagementApiToken = getManagementApiToken;
function getPackyApiToken() {
    return getApiToken(config_1.config.Auth0PackyApiId);
}
exports.getPackyApiToken = getPackyApiToken;
function getApiToken(audience) {
    // from https://manage.auth0.com/#/applications/awRaG0ilBVlaHQ2xK5JgehLjkBzLNthp/quickstart
    // see also https://auth0.com/docs/api/management/v2/get-access-tokens-for-production
    return node_fetch_1.default(`https://${config_1.config.Auth0Domain}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            client_id: config_1.config.Auth0PackyBackendAppId,
            client_secret: config_1.config.Auth0PackyBackendAppSecret,
            audience: audience,
            grant_type: "client_credentials"
        })
    })
        .then(response => response.json())
        .then((responseData) => {
        console.log('getApiToken.audience', audience, 'responseData', responseData);
        return responseData;
    });
}
exports.getApiToken = getApiToken;
async function getUsers() {
    return getManagementApiToken().then(async (data) => {
        return node_fetch_1.default(`https://${config_1.config.Auth0Domain}/api/v2/users`, getOptions(data.access_token))
            .then((response) => response.json())
            .then((responseData) => {
            console.log(responseData);
            return responseData;
        });
    });
}
exports.getUsers = getUsers;
async function getUser(userId) {
    return getManagementApiToken().then(async (data) => {
        return node_fetch_1.default(`https://${config_1.config.Auth0Domain}/api/v2/users/${userId}`, getOptions(data.access_token))
            .then((response) => response.json())
            .then((responseData) => {
            console.log('getUser.userId', userId, 'responseData', responseData);
            return responseData;
        });
    });
}
exports.getUser = getUser;
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    };
}
//# sourceMappingURL=apicalls.js.map