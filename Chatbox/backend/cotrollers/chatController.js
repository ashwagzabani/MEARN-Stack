const Chat = require('../models/chat');
//Done
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
//Done
exports.chatListByUserId = async (req, res, next) => {
    try {
        const chat = await Chat.find({ users: { $elemMatch: { userId: req.params.id } } });
        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}
//Done
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
//Done
exports.addNewMessageToExistChat = async (req, res, next) => {
    try {
        const id = req.params.id;
        const message = req.body.message;
        const chat = await Chat.findOneAndUpdate({ _id: id },
            { $push: { messages: message } });
        return res.send({ chat })
    }
    catch (err) {
        next(err);
    }
}


