const mongoose = require('mongoose');

const UserToDoSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    date: Date,
    notification: Boolean,
    priority: Boolean,
});

module.exports = mongoose.model('UserToDo', UserToDoSchema);
