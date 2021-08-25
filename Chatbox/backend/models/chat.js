const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
    ,
    messages: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String
        },
        sendTime: {
            type: Date,
            default: Date.now()
        }
    }],
})

module.exports = mongoose.model("chat", ChatSchema);
