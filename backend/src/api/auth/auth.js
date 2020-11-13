const express = require('express');
const router = express.Router();

const {authenticateMiddleware} = require('../../domain/authStategies');

const login = require('./login');

router.post('/login', authenticateMiddleware, login);

module.exports = router;
