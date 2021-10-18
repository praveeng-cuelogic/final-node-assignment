require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('middleware/jwtoken');
const errorHandler = require('middleware/error-handler');
require('dotenv').config();
const config = require('./config/index');

const server = require("http").createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(jwt());
app.use('/users', require('./routes/userRoutes'));
app.use(errorHandler);

const port = config.serverPort || 3000 ;

/* if(config.serverPort) {
    socket.emit('chat message', config.serverPort);
    config.serverPort = '';
} */

io.on('connection', socket => {
    console.log("Client connected" + socket.id);
    /* socket.broadcast.emit('socket');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    }); */
});

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});

