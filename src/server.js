// Create express application
const express = require('express');
const mongoose = require('mongoose');
/*
    cors allows us to do requests from different devices without
    compromise our requests 
*/
const cors = require('cors');
const app = express();
const RegisterController = require('./controllers/RegisterController');

const PORT = process.env.PORT || 8000;

/*
    If starting the server as a development environment then it's
    going to import dotenv extension
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cors());
/*
    express.json() returns a middleware that pass json as a
    response
*/
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from nodemon');
});

app.post('/register', RegisterController.store);

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
