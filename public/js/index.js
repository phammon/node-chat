var socket = io();
//not using arrow functions here because we want it to not crash in all browsers
socket.on('connect', function() {
    console.log('connected to server!');

    socket.emit('createMessage', {
        to: 'Patrick',
        text: 'Hey this is sent from the client!',
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server!');
});
//receiving message from server
socket.on('newMessage', function(newMessage) {
    console.log(newMessage);
});