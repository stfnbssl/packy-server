"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const config_1 = require("../../config");
const config = config_1.default();
function getUsers() {
    return node_fetch_1.default(url('users'), getOptions())
        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData);
        return responseData;
    });
}
exports.getUsers = getUsers;
function url(path) {
    console.log('url', config.Auth0ManagementEndpoint + '/' + path);
    return config.Auth0ManagementEndpoint + '/' + path;
}
function getOptions() {
    return {
        method: 'GET',
        headers: headers()
    };
}
function headers() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.Auth0ManagementApiToken,
    };
}
//# sourceMappingURL=request.js.map