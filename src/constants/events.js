const CONFIG_EVENTS = {
    CONFIG_GET: 'config:get',
    CONFIG_UPDATE: 'config:update',
    CONFIG_SAVE: 'config:save'
};

const DOWNLOAD_EVENTS = {
    DOWNLOAD_START: 'download:start',
    DOWNLOAD_STARTED: 'download:started',
    DOWNLOAD_ERROR: 'download:error',
    DOWNLOAD_PROGRESS_UPDATE: 'download:progressUpdate',
    DOWNLOAD_FINISHED: 'download:finished'
};

module.exports = Object.assign({}, CONFIG_EVENTS, DOWNLOAD_EVENTS);