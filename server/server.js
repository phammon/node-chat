const path = require('path');
//now we don't have to go up a directory
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 //tells heroku to use whatever port it needs or if were running locally just use 3000


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    //Emitting to everyone that joins. Calling GenerateMessage and passing it from and text strings
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat room'));

    //listening for message from client
    socket.on('createMessage', (message) => {
        /* io will emit the message to all users
        the message.from is coming from the message argument
        we pass in from above */
        io.emit('newMessage', generateMessage(message.from, message.text));

    });
    socket.on('disconnect', () => {
        console.log('user is no longer connected');
    });
});
server.listen(port, () => {
    console.log(`started listening on ${port}`);
});

module.exports = {app};