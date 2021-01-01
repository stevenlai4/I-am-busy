const express = require('express');
const routes = express.Router();
// Controllers
const UserController = require('./controllers/UserController');
const UserToDoController = require('./controllers/UserToDoController');

////////////////////////// User //////////////////////////
// Register user
routes.post('/user/register', UserController.createUser);
// Get user
routes.get('/user', UserController.getUserById);
// Update user
routes.put('/user/update', UserController.updateUser);

////////////////////////// User To Do //////////////////////////
// Create user to do
routes.post('/usertodo/create', UserToDoController.createUserToDo);

module.exports = routes;
