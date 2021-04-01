const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    phoneNumber: String,
    todoId: { type: mongoose.Schema.ObjectId, ref: 'UserToDo' },
    timeZone: String,
    time: { type: Date, index: true },
});
