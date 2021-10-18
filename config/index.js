require('dotenv').config()

module.exports = {
    notloggedInDays: process.env.NOT_LOGGED_IN_DAYS,
    mongoUri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_NAME,
    serverPort: process.env.SERVER_PORT,
    serverDb: process.env.SERVER_DB,
    JWTSecret: process.env.JWT_SECRET,
}