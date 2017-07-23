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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

var username = 'User';
jQuery('#username-form').on('submit', function(e) {

    e.preventDefault();
    username = jQuery('[name = username]').val();
    jQuery('[name = username]').val('');
    alert('Username have been set to '+ username);

});

console.log(username);
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
        from : username,
        text : jQuery('[name = message]').val()
    }, function (){

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position)
        socket.emit('createLocationMessage', {
            from : username,
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function () {
        alert('Unble to fetch location');
    })
})
