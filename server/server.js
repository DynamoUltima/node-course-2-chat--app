const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'john',
        text:'See you soon God willing',
        createdAt:12312
    })

    //Emitters and listeners(server side)
    // socket.emit('newEmail',{
    //     from:'mike@example.com',
    //     text:'Hey whats going on',
    //     createdAt:123
    // })

    socket.on('createEmail',(newEmail)=>{
        console.log('createEmail',newEmail);
    })

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server')
    })
})

server.listen(port, () => {
    console.log(`Server is up in port ${port}`);
})