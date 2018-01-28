var socket = io();
//not using arrow functions here because we want it to not crash in all browsers
socket.on('connect', function() {
    console.log('connected to server!');
});

socket.on('disconnect', function() {
    console.log('disconnected from server!');
});

//welcome message from admin
socket.on('newMessage', function(message) {
    console.log(message.text);
});
//receiving message from server
socket.on('newMessage', function(message) {
    let li = jQuery('<li></li>');
    li.text = `${message.from}: ${message.text}<br/>`;

    jQuery('#messages').append(li.text);
});

jQuery('#message-form').on('submit', function(e) {
    //so when we click send our page doesn't try to re-render
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('#message').val()
        /* the callback function below is our event acknoledgment,
        we are using it to confirm message went through */
    }, function() {

    });
});

