const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    emailToken: String,
    emailConfirmed: Boolean,
    password: String,
    mobile: Number,
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
