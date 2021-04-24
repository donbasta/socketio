const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const onlineUsers = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('enter chat', 'someone has entered the chat!');
    socket.on('chat message', (msg) => {
        console.log('from: ', msg.sender);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log(`user with id ${socket.id} disconnected`);
        const disconnectedUsername = onlineUsers[socket.id];
        console.log("sebelum dihapus: ", onlineUsers);
        delete onlineUsers[socket.id];
        console.log("sisa: ", onlineUsers);
        io.emit('leave chat', `${disconnectedUsername} has left the chat`);
    });
    socket.on('user typing', (who) => {
        io.emit('user typing', who);
    });
    socket.on('stop typing', () => {
        io.emit('stop typing');
    });
    socket.on('register online user', (user) => {
        onlineUsers[user.id] = user.username;
        console.log("current users now: ", onlineUsers);
    })
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});