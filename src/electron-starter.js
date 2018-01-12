const {app, BrowserWindow, ipcMain} = require('electron');
const authenticateVK = require('electron-vk-oauth2');

const APP_ID = '6306577';
const SCOPE = 'messages';

const path = require('path');
const url = require('url');
const configUtils = require('./utils/config');
const EVENTS = require('./constants/events');
const {downloadPhotos} = require('./utils/photo-loader');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
global.sharedObject = {};

function createMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            webSecurity: false
        }
    }); // TODO enable security for prod

    // and load the index.html of the app.
    /*    mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));*/
    // mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    createAuthWindow(mainWindow);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function createAuthWindow(mainWindow) {
    authenticateVK({
        appId: APP_ID,
        scope: SCOPE,
        revoke: false
    }, {
        parent: mainWindow
    }).then((res) => {
        global.sharedObject = {
            accessToken: res.accessToken
        };
        console.log(res);
        mainWindow.show();
        mainWindow.loadURL('http://localhost:3000'); // TODO add production support
    }).catch((err) => {
        console.error(err);
        mainWindow.destroy();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function init() {
    configUtils.readConfig().then((config) => {
        initEvents(config);
        // downloadPhoto({
        //     id: 1,
        //     photo_75: ''
        // }, config.workDir).then(id => console.log(`DL: ${id}`)).catch(err => console.error(err));
        createMainWindow();
    });
}

function initEvents(config) {
    ipcMain.on(EVENTS.CONFIG_GET, (event) => {
        event.sender.send(EVENTS.CONFIG_UPDATE, config);
    });
    ipcMain.on(EVENTS.DOWNLOAD_START, (event, photos) => {
        console.log('start', photos);
        // downloadPhotos(photos, config).map(promise =>
        //     promise.then(id => event.sender.send(EVENTS.DOWNLOAD_FILE_LOADED, id))
        // );
    });
}