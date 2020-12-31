const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamSchema',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
