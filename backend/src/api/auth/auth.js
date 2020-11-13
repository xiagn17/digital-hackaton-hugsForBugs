const express = require('express');
const router = express.Router();

const {authenticateMiddleware} = require('../../domain/authStategies');

const login = require('./login');

router.post('/login', authenticateMiddleware, login);
router.post('/test', (req, res, next) => {
    console.log('user test', req.user, req.isAuthenticated());
});

module.exports = router;
