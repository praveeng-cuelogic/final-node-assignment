const expressJwt = require('express-jwt');
const userService = require('../controllers/userController');
const config = require('../config/index');

function jwtoken() {
    const secret = config.JWTSecret;
    return expressJwt({secret, algorithms: ['HS256'], isRevoked}).unless({
        path: [
            '/users/authenticate',
            '/users/signup'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    if (!user) {
        return done(null, true);
    }
    done();
};
module.exports = jwtoken;
