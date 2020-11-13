const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('../api');
const authRouter = require('../api/auth/auth');

module.exports = function ({ expressApp: app }) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        secret: config.default.sessionKey,
        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: false,
        },
    }));


    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', indexRouter);
    app.use('/auth', authRouter);
};
