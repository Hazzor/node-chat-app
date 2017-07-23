const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//listen to client conn and create web socket to individual client
io.on('connection' , (socket)=>{
    console.log('New user connected');

    socket.emit('newEmail', {
        from : 'hester@gmail.com',
        text : 'come here fast',
        createdAt : 123
    });

    socket.emit('newMessage', {
        from : 'hester',
        text : 'come here fast.. play badminton jom!',
        createdAt : new Date().getTime().toString()
    });

    socket.on('createMessage', (message)=>{
        console.log('new message from client',message);
        io.emit('newMessage', {
            from : message.from,
            text : message.text,
            createdAt : new Date().getTime()
        })
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