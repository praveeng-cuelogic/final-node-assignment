const express = require('express');
const router = express.Router();
const userService = require('../controllers/userController');
const UserActivity = require('../controllers/userActivity');
const User = require('../models/userModel');
//const validateMiddleWare = require('../middleware/validate')
//const {validateUser} = require('../models/userModel')

router.post('/signup', /* [validateMiddleWare(validateUser)], */ signUp);
router.post('/authenticate', authenticate);
router.get('/', getAllUsers);
router.get('/:id', getById);
router.put('/:id', update);
router.get('/notloggedin/users', getNotLoggedIn);

function authenticate(req, res, next) {

    console.log(req.body);
    const { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send("All input is required");
    }

    userService.authenticateUser(req.body)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
                return UserActivity(req, user._id);
            } else {
                res.status(400).json({message: 'Username or password is incorrect!'})
            }
        }) 
        /* .then(() => {
            res.status(200).json({"message": "Valid!"});
        }) */
        .catch(err => next(err));
}

function signUp(req, res, next) {
    userService.createUser(req.body)
        .then(() => {
            res.status(200).json({"message": "User Added!"});
        })
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function getNotLoggedIn(req, res, next) {
    userService.getNotLoggedIn()
        .then(users => {
            //let userid = users.map(a => a.userid)
            //console.log(userid)
            res.json(users)
        })
        .catch(err => next(err));
}

module.exports = router;

