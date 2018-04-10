const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//db connection
mongoose.connect('mongodb://localhost/chat-databse')
.then(db => console.log('db is connected'))
.catch(err => console.log(err));

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