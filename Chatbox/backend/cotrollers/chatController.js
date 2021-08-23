const Chat = require('../models/chat');

exports.send = async (req, res, next) => {
    try {
        const users = req.body.users;
        const messages = req.body.messages;
        const chat = await Chat.create({ users, messages });

        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}
exports.chatListByUserId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chat = await Chat.find({ users: { $elemMatch: { id } } });
        console.log(id);
        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}
exports.chatById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chat = await Chat.findOne({ _id: { $eq: id } });
        console.log(id);
        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}

exports.addNewMessageToExistChat = async (req, res, next) => {
    try {
        const id = req.params.id;
        const message = req.body.message;
        const chat = await Chat.findOneAndUpdate({ _id: { $eq: id } },
            { $push: { messages: { message } } });
        console.log(id);
        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}
