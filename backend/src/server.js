const http = require('http');
const express = require('express');

const loaders = require('./loaders');

async function boot() {
    const expressApp = express();
    const httpServer = http.createServer(expressApp);

    await loaders.init({ httpServer, expressApp });

    httpServer.listen(config.default.port);
    console.log(`HTTP server is booted up on port ${config.default.port}`);
}

boot().catch((e) => {
    console.error('Crash on start', e);
});
