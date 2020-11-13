module.exports = {
    port: process.env.PORT || '4000',
    sessionKey: 'secretSuperSecret!',
    roles: {
        ADMIN: 'ADMIN',
        USER: 'USER',
    }
};
