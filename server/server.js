const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users')

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();



app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        //io.emit -> broadcast to every one
        //socket.broadcast.emit -> to everone except user who emiited it
        //socket.emit -> to a particular user

        socket.join(params.room) /* this creates a room section */
        //socket.leave('The Office Fans') to leave the room
        users.removeUser(socket.id)

        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updatedUserList', users.getUserList(params.room))


        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();


    })




    //Emitters and listeners(server side)
    // socket.emit('newEmail',{
    //     from:'mike@example.com',
    //     text:'Hey whats going on',
    //     createdAt:123
    // })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    })

    //Note that socket.on()  is a listener 

    socket.on('createMessage', (message, callback) => {
        //console.log('createMessage', message);
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

        }

        //broadcasting Messages

        callback();

    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));

        }


    })

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updatedUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
        // console.log('Disconnected from server')
    })
})

server.listen(port, () => {
    console.log(`Server is up in port ${port}`);
})