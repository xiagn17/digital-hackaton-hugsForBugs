const mongoose = require('mongoose');
const {UserService} = require('../services');

module.exports = async () => {
    mongoose.connection.once('open', () => {
        UserService.createUser({
            fullName: 'Михаил Михалыч',
            groupId: '12345678'
        });
        UserService.createUser({
            fullName: 'Алексей Алексыч',
            groupId: '87654321'
        });
        UserService.createAdmin({
            fullName: 'admin',
            groupId: 'admin'
        });
        console.log('MongoDB connected!')
    });
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    await mongoose.connect(config.mongodb.url, { useNewUrlParser: true });
};

