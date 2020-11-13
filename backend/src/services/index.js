const UserService = require('./UserService');
const UserModel = require('../models/User');

module.exports = {
    UserService: new UserService(UserModel)
}
