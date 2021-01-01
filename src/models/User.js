const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    todo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserToDo',
        },
    ],
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
