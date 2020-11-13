
const login = (req, res, next) => {
    console.log('logged user!', req.user);
    res.sendStatus(200);
};

module.exports = login;
