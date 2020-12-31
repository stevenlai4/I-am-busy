const express = require('express');
const routes = express.Router();
// Controllers
const UserController = require('./controllers/UserController');

////////////////////////// User //////////////////////////
// Register user
routes.post('/user/register', UserController.createUser);
// Get single user
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;
