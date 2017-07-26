const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//listen to any conn and create web socket to individual client
io.on('connection' , (socket)=>{
    console.log('New user connected');
    console.log(socket.id);

    socket.on('join', (params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return  callback('Name and room name are required');
        }

        socket.join(params.room);
        // socket.leave('room name');
        // io.emit -> io.to('room name').emit
        // socket.broadcast.emit -> socket.broadcast.to('room name').emit
        // socket.emit -> 
        // users.removeUser(socket.id); //in case user already in room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserlist(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createLocationMessage', (position)=>{
        var user = users.getUser(socket.id);
        
        if (user) {
// io broadcast to others
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, `${position.latitude}` , `${position.longitude}`));
        }

      
    });

    socket.on('createMessage', (message, callback)=>{
        
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
// io broadcast to others
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
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
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserlist(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }

    });
});

//use nodejs http
server.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});