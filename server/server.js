const path = require('path');
//now we don't have to go up a directory
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 //tells heroku to use whatever port it needs or if were running locally just use 3000


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    //listening for message from client
    socket.on('createMessage', (message) => {
        console.log('Message received from client', message);
        /* io will emit the message to all users
        the message.from is coming from the message argument
        we pass in from above */
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); 
    });
    socket.on('disconnect', () => {
        console.log('user is no longer connected');
    });
});
server.listen(port, () => {
    console.log(`started listening on ${port}`);
});

module.exports = {app};