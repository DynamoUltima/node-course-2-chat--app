var socket = io();

socket.on('connect',function ()  {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Jane',
        text: 'Its working for my good'
    });
});



socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

// socket.on('newEmail',function (email){
//     console.log('New email',email);
// })

socket.on('newMessage',function (message){
    console.log('newMessage',message)
})