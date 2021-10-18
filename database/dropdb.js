const mongodbconnection = require("mongoose");
const config = require('../config/index');

const dbUrl = config.serverDb;

mongodbconnection.connect(dbUrl);
const connection = mongodbconnection.connection;
connection.once("open", function () {
    console.log(`Our Current Database Name : ${connection.db.databaseName}`);
    mongodbconnection.connection.db.dropDatabase(
        console.log(`${connection.db.databaseName} database dropped.`)
    );
});
