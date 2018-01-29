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
socket.on('newLocationMessage', function(message) {
    let listItem = jQuery('<li></li>');
    let link = jQuery('<a target="_blank">My Current Location</a>')
    let li = listItem;
    let a = link;
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function(e) {
    //so when we click send our page doesn't try to re-render
    e.preventDefault();
    let messageTextbox = jQuery('#message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
        /* the callback function below is our event acknoledgment,
        we are using it to confirm message went through */
    }, function() {
        messageTextbox.val('');
    });
});

let buttonLocation = jQuery('#send-location');
buttonLocation.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported!');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    //failure case
    }, function() {
        alert('Unable to fetch location.');
    }); 
});
