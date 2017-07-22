// create connection instance, not always on(client)
var socket = io();
// socket.io._reconnection = false;

socket.on('connect', function (){
    console.log('Connected to server');

    socket.emit('createEmail', {
        to : 'hester',
        text : 'Hey fucker'
    });

    socket.emit('createMessage', {
        from : 'alibaba',
        text : 'Hey fucker 222'
    });
});

socket.on('disconnect', function () {
console.log('Disconnected to server');
});

socket.on('newEmail', function(email) {
    console.log('New email', email);
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});

