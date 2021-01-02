const express = require('express');
const routes = express.Router();
// Controllers
const UserController = require('./controllers/UserController');
const UserToDoController = require('./controllers/UserToDoController');
const LoginController = require('./controllers/LoginController');

////////////////////////// Login //////////////////////////
// Login user
routes.post('/login', LoginController.login);

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
// Get user to dos
routes.get('/usertodo', UserToDoController.getUserToDos);
// Get user to do
routes.get('/usertodo/:toDoId', UserToDoController.getUserToDoById);
// Update user to do
routes.put('/usertodo/update/:toDoId', UserToDoController.updateUserToDoById);
// Delete user to do
routes.delete('/usertodo/:toDoId', UserToDoController.deleteUserToDo);

module.exports = routes;
