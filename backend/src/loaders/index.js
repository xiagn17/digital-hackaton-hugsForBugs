const configLoader = require('./configLoader');
const expressLoader = require('./expressLoader');
const mongoLoader = require('./mongoLoader');


async function init({ httpServer, expressApp }) {
    await configLoader();
    await mongoLoader();
    expressLoader({ expressApp });
}

module.exports = {
    init,
};
