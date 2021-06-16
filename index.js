const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/ask.html');
});

io.on('connection', (socket) => {
    socket.on('askQuestion', (who) => {
        console.log("question object has entered the server: ", who);
        io.emit('showQuestion', who);
    })
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});