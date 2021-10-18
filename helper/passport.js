const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

module.exports = {
    initialize: () => {
        var opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: process.env.JWT_SECRET
        }
        passport.use(new Strategy(opts, function (jwt_payload, done) {
            User.findOne({ id: jwt_payload.id }, function (err, user) {
                //console.log(err);
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
        return passport.initialize();
    },
    authenticate: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                //console.log(user);
                const status = 401;
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ status: status, message: "Your token has expired!." });
                } else {
                    return res.status(401).json({ status: status, message: "Invalid Token!." });
                }
            }
            req.user = user;
            return next();
        })(req, res, next);
    }

};