const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//Settings
app.set('port', process.env.port || 3000);
//Calling socket.js function(io) 
require('./sockets')(io);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
server.listen(3000, () => {
    console.log('Server on port', app.get('port'));
});