const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { UserService } = require('../services');


passport.serializeUser((user, done) => {
    console.log(user.id, user._id);
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await UserService.findUser(id);
    done(null, user);
});

const localStrategy = new LocalStrategy({
        usernameField: 'fullName',
        passwordField: 'groupNumber'
    },
    async (fullName, groupNumber, done) => {
        console.log(fullName, groupNumber);
        const userDTO = await UserService.signIn({ fullName, groupNumber });
        if (!userDTO) return done(null, false);
        return done(null, userDTO);
    }
);
passport.use('local', localStrategy);

const authenticateMiddleware = passport.authenticate('local');

module.exports = { authenticateMiddleware };
