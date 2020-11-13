const { readConfig } = require('../config');

async function configLoader() {
    global.config = await readConfig();
    console.log('Configs loaded ', config);
}

module.exports = configLoader;
