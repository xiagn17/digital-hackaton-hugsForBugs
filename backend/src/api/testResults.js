const express = require('express');
const router = express.Router();

const { TestResultsService } = require('../services');

router.post('/create', async (req, res, next) => {
    const {user, body: { results }} = req;
    await TestResultsService.create(results, user);
    res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
    const {user} = req;
    const results = await TestResultsService.getByUser(user);
    console.log(results);
    res.send(results);
});

module.exports = router;
