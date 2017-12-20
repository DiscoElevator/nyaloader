const electron = window.require('electron');

const API_VERSION = '5.69';
const API_URL = (method) => `https://api.vk.com/method/${method}`;
const TOKEN_PARAM = 'access_token';

const constructURL = (method, token, params) => {
    const url = new URL(API_URL(method));
    url.searchParams.append(TOKEN_PARAM, token);
    url.searchParams.append('v', API_VERSION);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    return url;
};

const exec = (method, params) => {
    const token = electron.remote.getGlobal('sharedObject').accessToken;
    if (!token) {
        return Promise.reject('No token');
    }
    const url = constructURL(method, token, params);
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => res.response)
        .catch(err => {console.error(err); return err;});
};

export const fetchUserData = () => exec('account.getProfileInfo');
export const fetchImages = (chatId, startFrom = 0, count = 10) =>
    exec('messages.getHistoryAttachments', {
        peer_id: chatId,
        media_type: 'photo',
        photo_sizes: 0,
        start_from: startFrom,
        count
    });