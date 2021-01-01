const express = require('express');
const routes = express.Router();
// Controllers
const UserController = require('./controllers/UserController');
const UserToDoController = require('./controllers/UserToDoController');

////////////////////////// User //////////////////////////
// Register user
routes.post('/user/register', UserController.createUser);
// Get single user
routes.get('/user', UserController.getUserById);

////////////////////////// User To Do //////////////////////////
// Create user to do
routes.post('/usertodo/create', UserToDoController.createUserToDo);

module.exports = routes;
