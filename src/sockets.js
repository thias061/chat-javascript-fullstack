module.exports = function(io){
    io.on('connection', socket => {
        console.log('new user conected');

        //Listening for the event send message
        socket.on('send message', (data) =>{
            io.sockets.emit('new message', data);
        });
    });
}