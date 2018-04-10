$(function () {
    
    const socket = io();

    //Obtain DOM elements from interface
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    const contentWrap = $('#contentWrap');

    //Obtain DOM elements from nicknameForm
    const nicknameForm = $('#nickForm');
    const nickError = $('#nickError');
    const nickname = $('#nickname');
    const nickWrap =  $('#nickWrap');

    const users = $('#usernames');

    //Events
    nicknameForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', nickname.val(), data => {
            if(data){
                nickWrap.hide();
                contentWrap.show();
            }else{
                nickError.html(`
                    <div class="alert alert-danger">
                        That user already exists
                    <div/>
                `);
            }

            nickname.val('');
        });
    });
    
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', messageBox.val());
        messageBox.val('');
    });

    socket.on('new message', data => {
        chat.append('<b>' + data.nick + '</b> : ' + data.msg + '</br>');
    });

    socket.on('usernames', data => {
        let html = '';
        for(let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
        }
        users.html(html);
    });
})