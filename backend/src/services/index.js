const UserService = require('./UserService');
const UserModel = require('../models/User');

const TestResultsService = require('./TestResultsService');
const TestResults = require('../models/TestResults');

module.exports = {
    UserService: new UserService(UserModel),
    TestResultsService: new TestResultsService(TestResults),
}
