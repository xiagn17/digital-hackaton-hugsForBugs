
const login = (req, res, next) => {
    console.log('logged user!', req.user);
    res.send(req.user);
};

module.exports = login;
