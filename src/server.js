// Create express application
const express = require('express');
const mongoose = require('mongoose');
/*
    cors allows us to do requests from different devices without
    compromise our requests 
*/
const cors = require('cors');
const routes = require('./routes');
const app = express();

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

app.use(routes);

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
