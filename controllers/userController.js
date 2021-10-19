const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = db.User;
const UserActivity = db.UserActivity;
const config = require('../config/index');

async function authenticateUser({username, password}) {

    const user = await User.findOne({ username });
    //console.log(user);

    const secret = config.JWTSecret;
    /* if(user){
        bcrypt.compare(password, user.password).then(match => {
            if(match){
                const token = jwt.sign({sub: user.id}, secret, {expiresIn: '5d'});
                return {
                    ...user.toJSON(),
                    token
                };
            }
        });
    } */

    if (user && bcrypt.compare(password, user.password)) {
        const token = jwt.sign({sub: user.id}, secret, {expiresIn: '5d'});
        return {
            ...user.toJSON(),
            token
        };
    }

    //res.status(400).send("Invalid Credentials");
}

async function createUser(userParam) {
    //console.log(userParam);
    if (await User.findOne({username: userParam.username})) {
        throw `Username ${userParam.username} is already exists`;
    }
    //console.log(JSON.parse(userParam));
    const user = new User(userParam);
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    await user.save();
}

async function updateUser(id, userParam) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({username: userParam.username})) {
        throw `Username ${userParam.username} is already exists`;
    }
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }
    Object.assign(user, userParam);
    await user.save();
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function getNotLoggedIn() {
    let today = new Date();
    let notLoggedInDays = config.notloggedInDays;
    let activeDay = new Date(new Date().getTime() - notLoggedInDays * 24 * 60 * 60 * 1000);
    let activeUsers = await UserActivity.find({
        createdDate: {
            $gt: activeDay,
            $lte: today
        }
    }, 'userid');
    let userIds = activeUsers.map(userActivity => userActivity.userid)
    let inactiveUsers = await User.find({'_id': {$nin: userIds}});
    //console.log("user" + userIds)
    return inactiveUsers
}

module.exports = {
    authenticateUser,
    getAll,
    getById,
    createUser,
    updateUser,
    getNotLoggedIn
};
