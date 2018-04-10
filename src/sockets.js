const Chat = require('./models/Chat');

module.exports = function (io) {

    let users = {};

    io.on('connection', socket => {

        //Listening for the event new user
        socket.on('new user', (name, cb) => {
            if(name in users){
                cb(false);
            }else{
                cb(true);
                socket.nickname = name;
                users[socket.nickname] = socket;
                updateNicknames();
            }
        });

        //Listening for the event send message
        socket.on('send message', (data, cb) => {
            var msg = data.trim();

            if(msg.substr(0,3) === '/w '){
                msg = msg.substr(3);
                
                const index = msg.indexOf(' ');
                
                if(index !== -1){
                    var name = msg.substr(0, index);
                    var message = msg.substr(index + 1);
                    if(name in users){
                        users[name].emit('whisper', {
                            msg: message,
                            nick: socket.nickname
                        })
                    }else{
                        cb('Error ! please enter a valid user');
                    }
                }else{
                    cb('Error! Please enter your message');
                }
            }else{
                var newMsg = new Chat({
                    msg: data,
                    nick: socket.nickname
                });
                
                
                io.sockets.emit('new message', {
                    msg: data,
                    nick : socket.nickname
                });
            }
        });

        socket.on('disconnect', data =>{
            if(!socket.nickname) return;
            delete users[socket.nickname];
            updateNicknames();
        });

        function updateNicknames(){
            io.sockets.emit('usernames', Object.keys(users));
        }
    });
}