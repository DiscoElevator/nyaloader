const https = require('https');
const fs = require('fs');
const promisify = require('util.promisify'); // TODO replace with native after Electon 1.8 release
const EVENTS = require('../constants/events');

const writeFile = promisify(fs.writeFile);

const LINK_KEY_PREFIX = 'photo_';

const getPhotoURL = (photo) => {
    const maxSize = Object.keys(photo)
        .filter(key => key.startsWith(LINK_KEY_PREFIX))
        .map(key => Number(key.substring(LINK_KEY_PREFIX.length)))
        .reduce((acc = 0, val) => Math.max(acc, val));
    return photo[LINK_KEY_PREFIX + maxSize];
};

const downloadPhoto = (photo, workDir) => {
    return new Promise((resolve, reject) => {
        const url = getPhotoURL(photo);
        if (!url) {
            reject('Cannot find url');
        }
        https.get(url, res => {
            if (res.statusCode !== 200) {
                console.error(`Error loading file ${photo.id}. Status code: ${res.statusCode} Url: ${url}`);
                reject(photo.id);
                return;
            }
            let data;
            res.on('data', (chunk) => {
                if (!data) {
                    data = chunk;
                    return;
                }
                data = Buffer.concat([data, chunk]);
            });
            res.on('end', () => {
                writeFile(`${workDir}/${photo.id}.jpg`, data).then(() => resolve(photo.id));
            });
            res.on('error', err => reject(err));
        }).on('error', err => reject(err));
    });
};

const downloadPhotos = (photos, {workDir}) => {
    return photos.map(photo => downloadPhoto(photo, workDir));
};

const photoDownloadHandler = (config) => {
    return (event, photos) => {
        let progress = 0;
        console.log(`Started loading of ${photos.length} photos`);
        event.sender.send(EVENTS.DOWNLOAD_STARTED);
        Promise.all(downloadPhotos(photos, config).map(promise =>
            promise.then(id => {
                progress++;
                event.sender.send(EVENTS.DOWNLOAD_PROGRESS_UPDATE, {id, progress});
            })
        )).then(() => {
            event.sender.send(EVENTS.DOWNLOAD_FINISHED);
            console.log('loading finished');
        });
    };
};

module.exports = {
    photoDownloadHandler
};