const mongoose = require('mongoose');
const {UserService} = require('../services');

module.exports = async () => {
    mongoose.connection.once('open', () => {
        UserService.createUser({
            fullName: 'Михаил Михалыч',
            groupNumber: '12345678'
        });
        UserService.createUser({
            fullName: 'Алексей Алексыч',
            groupNumber: '87654321'
        });
        UserService.createAdmin({
            fullName: 'admin',
            groupNumber: 'admin'
        });
        console.log('MongoDB connected!')
    });
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    await mongoose.connect(config.mongodb.url, { useNewUrlParser: true });
};

