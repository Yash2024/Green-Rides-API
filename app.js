const express = require('express');
const app= express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


userRoutes = require('./api/routes/users');
cycleRoutes = require('./api/routes/cycles');

mongoose.connect('mongodb+srv://node-shop:node-shop@cluster0.giegz.mongodb.net/cycle-system?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());

app.use('/users', userRoutes);
app.use('/cycles', cycleRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;