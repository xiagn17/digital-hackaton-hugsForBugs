module.exports = {
    port: process.env.PORT || '4000',
    sessionKey: 'secretSuperSecret!',
    roles: {
        ADMIN: 'ADMIN',
        USER: 'USER',
    },
    mongoUrl: process.env.MONGO_URL || 'localhost:27018',
};
