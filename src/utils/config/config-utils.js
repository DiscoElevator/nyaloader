const fs = require('fs');
const {promisify} = require('util');
const DEFAULT_CONFIG = require('../../constants/default-config');

const CONFIG_FILE = 'config.json';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mergeWithDefault = (config) => Object.assign({}, DEFAULT_CONFIG, config);

const readConfig = async () => {
    try {
        let config = DEFAULT_CONFIG;
        const buffer = await readFile(CONFIG_FILE);
        const data = await buffer.toString();
        if (data) {
            config = JSON.parse(data);
        }
        return mergeWithDefault(config);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('config file not found, using default');
            return DEFAULT_CONFIG;
        }
        throw err;
    }
};

const writeConfig = async (config) => {
    const configToWrite = mergeWithDefault(config);
    return writeFile(CONFIG_FILE, JSON.stringify(configToWrite));
};

module.exports = {
    readConfig,
    writeConfig
};