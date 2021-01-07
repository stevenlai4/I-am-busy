const mongoose = require('mongoose');

const UserToDoSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    date: Date,
    date_created: Date,
    notification: Boolean,
    priority: Boolean,
    finished: Boolean,
});

module.exports = mongoose.model('UserToDo', UserToDoSchema);
