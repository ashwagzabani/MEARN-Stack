const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const authRouters = require('./routs/user')

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRouters)

const server = app.listen(8000, () => {
    console.log("listening... on port 8000");
});


const io = socket(server);

//to send message from server to client
//io.emit ==> to send to anther client 
//socket.emit ==> to send to client theirself

io.on('connection', function (socket) {
    socket.on('SEND_MESSAGE', function (data) {
        io.emit('RECEIVE_MESSAGE', data);
    });
});

