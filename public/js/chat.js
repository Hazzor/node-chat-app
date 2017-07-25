// use function instead of template string

// create connection instance, not always on(client)
var socket = io();

function scrollToBottom() {
//selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child'); //dynamic
//heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight'); //dynamic
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + 5*lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);

//      messages.animate({scrollTop:scrollHeight}, 1000);
//  return false;
}
};
// socket.io._reconnection = false;

socket.on('connect', function (){
    console.log('Connected to server');

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err){
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('haha no error');
        }
    });

    // socket.emit('createEmail', {
    //     to : 'hester',
    //     text : 'Hey fucker'
    // });

    // socket.emit('createMessage', {
    //     from : 'alibaba',
    //     text : 'Hey fucker 222'
    // });
});

socket.on('newLocationMessage', function (message) {
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime} : `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url : message.url,
        from : message.from,
        createdAt : formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();


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

socket.on('updateUserList', function (users) {
    // console.log('Users list', users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {

        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newEmail', function(email) {
    console.log('New email', email);
});

socket.on('newMessage', function(message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // console.log('New message', message);
    //create new jquery object
    // var time = jQuery('<h1 style="color:green;text-align:right">'+formattedTime+'</h1>');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} : ${message.text}`);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from : 'frank',
//     text : 'Hi'
// }, function(noti) {
//     console.log(noti);
// });

jQuery('#message-form').on('submit', function(e) {
    var messageText = jQuery('[name= message]');
    e.preventDefault();

    socket.emit('createMessage', {
        from : username,
        text : messageText.val()
    }, function (){
        messageText.val('');
    });
    
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position)
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            from : username,
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Sending location...');
        alert('Unble to fetch location');
    })
})
