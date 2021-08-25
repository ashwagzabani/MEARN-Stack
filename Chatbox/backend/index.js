const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const Chat = require('./models/chat');

const app = express();
app.use(cors());

const mongoose = require('mongoose');
const authRouters = require('./routs/user')
const chatRouters = require('./routs/chat')
const chatController = require('./cotrollers/chatController')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/testdb', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRouters)
app.use('/api/chat', chatRouters)

const server = app.listen(8000, () => {
    console.log("listening... on port 8000");
});


const io = socket(server);

//to send message from server to client
//io.emit ==> to send to anther client 
//socket.emit ==> to send to client theirself

io.on('connection', function (socket) {
    socket.on('CONNECTED', data => {
        Chat.findOne({ _id: data.id })
            .then(response => {
                // console.log("object: ", response.messages);
                let messages = {
                    messages: response.messages
                }
                socket.emit('Old_MESSAGES', messages);
            })
            .catch(err => {
                console.log(err);
            });
        // console.log("connected ", data);
    })

    socket.on('SEND_MESSAGE', function (data) {
        console.log(data);
        try {
            const chat = Chat.findOneAndUpdate({ _id: data.id },
                { $push: { messages: data.messages } })
                .then(res => {
                    // console.log(res);
                    console.log("success");
                });
            // console.log(chat)
        }
        catch (err) {
            console.log(err);
        }

        //send all chat messages to client
        Chat.findOne({ _id: data.id })
            .then(response => {
                // console.log("object: ", response.messages);
                let messages = {
                    messages: response.messages
                }
                io.emit('RECEIVE_MESSAGE', messages);
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(messages);
    });
});

