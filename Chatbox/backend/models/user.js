const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false //to avoid select password auto , is to select password manualy to acoid back to same password becaus is not secure
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("user", UserSchema);
