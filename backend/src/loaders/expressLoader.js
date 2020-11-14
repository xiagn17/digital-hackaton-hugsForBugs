const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');

const apiRouter = require('../api');

module.exports = function ({ expressApp: app }) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(
        cors({
          credentials: true,
          origin: "http://localhost:3000/",
          optionsSuccessStatus: 200
        })
    );

    app.use(session({
        secret: config.default.sessionKey,
        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: false,
        },
    }));


    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', apiRouter);
};
