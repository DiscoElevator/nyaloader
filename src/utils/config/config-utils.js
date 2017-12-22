const fs = require('fs');
const promisify = require('util.promisify');
const DEFAULT_CONFIG = require('./default-config');

const CONFIG_FILE = 'config.json';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const readConfig = async () => {
    try {
        let config = DEFAULT_CONFIG;
        const buffer = await readFile(CONFIG_FILE);
        const data = await buffer.toString();
        if (data) {
            config = JSON.parse(data);
        }
        return config;
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('config file not found, using default');
            return DEFAULT_CONFIG;
        }
        throw err;
    }
};

const writeConfig = async (config) => {
    const configToWrite = Object.assign({}, DEFAULT_CONFIG, config);
    return await writeFile(CONFIG_FILE, JSON.stringify(configToWrite));
};

module.exports = {
    readConfig,
    writeConfig
};