const CONFIG_EVENTS = {
    CONFIG_GET: 'config:get',
    CONFIG_UPDATE: 'config:update',
    CONFIG_SAVE: 'config:save'
};

const DOWNLOAD_EVENTS = {
    DOWNLOAD_START: 'download:start',
    DOWNLOAD_ERROR: 'download:error',
    DOWNLOAD_FILE_LOADED: 'download:fileLoaded'
};

module.exports = Object.assign({}, CONFIG_EVENTS, DOWNLOAD_EVENTS);