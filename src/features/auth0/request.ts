import fetch from 'node-fetch';
import configInit from '../../config';
import { ConfigType } from '../../types';
 
const config: ConfigType = configInit();

export function getUsers() : Promise<any> {
    return fetch(url('users'), getOptions())
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData);
        return responseData;
    });
}

function url(path: string) {
    console.log('url', config.Auth0ManagementEndpoint + '/' + path);
    return config.Auth0ManagementEndpoint + '/' + path;
}

function getOptions() {
    return {
        method: 'GET',
        headers: headers()
    }
}

function headers() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.Auth0ManagementApiToken,
    }
}