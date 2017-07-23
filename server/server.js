const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//listen to any conn and create web socket to individual client
io.on('connection' , (socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // socket.emit('newEmail', {
    //     from : 'hester@gmail.com',
    //     text : 'come here fast',
    //     createdAt : 123
    // });

    // socket.emit('newMessage', {
    //     from : 'hester',
    //     text : 'come here fast.. play badminton jom!',
    //     createdAt : new Date().getTime().toString()
    // });
    socket.on('createLocationMessage', (position)=>{
        io.emit('newLocationMessage', generateLocationMessage(`${position.from}`, `${position.latitude}` , `${position.longitude}`))
    });

    socket.on('createMessage', (message, callback)=>{
        console.log('new message from client',message);
// io broadcast to others
        io.emit('newMessage', generateMessage(message.from, message.text));
        if (callback) callback('Server received your message');

//emit to other people but not you
        // socket.broadcast.emit('newMessage', {
        //     from : message.from,
        //     text : message.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on('createEmail', (newEmail)=>{
        console.log('new email from client', newEmail);
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected')
    });
});

//use nodejs http
server.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});