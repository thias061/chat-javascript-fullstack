$(function () {
    
    const socket = io();

    //Obtain DOM elements from interface
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    //Events
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', messageBox.val());
        messageBox.val('');
    });

    socket.on('new message', (data) => {
        chat.append(data + '<br/>');
    })
})