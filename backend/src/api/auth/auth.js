const express = require('express');
const router = express.Router();

const {authenticateMiddleware} = require('../../domain/authStategies');

const login = require('./login');

router.post('/login', authenticateMiddleware, login);
router.post('/me', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.send(req.user);
    }
    res.sendStatus(401)
});
router.post('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        res.status(200).json({
            success: true
        })
    });});

module.exports = router;
