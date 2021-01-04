const express = require('express');
const routes = express.Router();
// Controllers
const UserController = require('./controllers/UserController');
const UserToDoController = require('./controllers/UserToDoController');
const UserToDoHistoryController = require('./controllers/UserToDoHistoryController');
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

////////////////////////// User To Do History //////////////////////////
// Get user finished to do
routes.get('/user/todo/history', UserToDoHistoryController.getUserToDoHistory);
// Restore user finished to do
routes.put(
    '/user/todo/history/:toDoId',
    UserToDoHistoryController.restoreUserToDo
);

////////////////////////// User To Do //////////////////////////
// Create user to do
routes.post('/user/todo/create', UserToDoController.createUserToDo);
// Get user to dos
routes.get('/user/todo', UserToDoController.getUserToDos);
// Update user to do
routes.put('/user/todo/update/:toDoId', UserToDoController.updateUserToDoById);
// Get user to do
routes.get('/user/todo/:toDoId', UserToDoController.getUserToDoById);
// Finished user to do
routes.put('/user/todo/:toDoId', UserToDoController.finishedUserToDo);
// Delete user to do
routes.delete('/user/todo/:toDoId', UserToDoController.deleteUserToDo);

module.exports = routes;
