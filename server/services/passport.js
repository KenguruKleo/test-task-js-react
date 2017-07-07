import passport from 'passport';
import User from '../models/user';
import config from '../config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { BasicStrategy } from 'passport-http';

const basicStrategy = new BasicStrategy(function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false)}

            user.comparePassword(password, function (err, isMatch) {
                if (err) { return done(err) }
                if (!isMatch) { return done(null, false) }

                return done(null, user);
            })
        });
    }
);

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise call done with false
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false)}

        //compare passwords - is 'passwords' equal to user.passwords
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err) }
            if (!isMatch) { return done(null, false) }

            return done(null, user);
        })
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //See if the user ID in the payload exist in our database
    //If it does, call 'done' with that other
    //otherwise, call done without a user object
    User.findById( payload.sub, function (err, user) {
        if (err) { return done(err, false) }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(basicStrategy);
