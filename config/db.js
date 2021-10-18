const mongoose = require('mongoose');
const config = require('./index');

//mongoose.Types.ObjectId.isValid('594ced02ed345b2b049222c5');
const mongoDB = config.serverDb;
/* const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}; */
mongoose.Promise = require('bluebird');

mongoose.connect(mongoDB /* connectionOptions */);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log("Successfully connected to MongoDB!");
});

module.exports = {
    User: require('../models/userModel'),
    UserActivity: require('../models/usersActivity')
};

