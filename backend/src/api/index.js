const express = require('express');
const router = express.Router();

const authRouter = require('../api/auth/auth');
const testResultsRouter = require('./testResults');

router.use('/auth', authRouter);
router.use('/testResults', testResultsRouter);

module.exports = router;
