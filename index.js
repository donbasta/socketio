const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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
        console.log('user disconnected');
        io.emit('leave chat', 'someone has left the chat');
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});