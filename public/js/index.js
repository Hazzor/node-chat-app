// create connection instance, not always on(client)
var socket = io();
// socket.io._reconnection = false;

socket.on('connect', function (){
    console.log('Connected to server');

    socket.emit('createEmail', {
        to : 'hester',
        text : 'Hey fucker'
    });

    // socket.emit('createMessage', {
    //     from : 'alibaba',
    //     text : 'Hey fucker 222'
    // });
});

socket.on('disconnect', function () {
console.log('Disconnected to server');
});

socket.on('newEmail', function(email) {
    console.log('New email', email);
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
    //create new jquery object
    var li = jQuery('<li></li>');
    console.log("li", li);
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from : 'frank',
//     text : 'Hi'
// }, function(noti) {
//     console.log(noti);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from : 'User',
        text : jQuery('[name = message]').val()
    }, function (){

    });
});
