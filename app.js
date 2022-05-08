var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const winston = require('winston');
const cors = require('cors');

var scholarhipRouter = require('./routes/scholarship');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/scholarship', scholarhipRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// database
mongoose.connect('mongodb+srv://hamsa:lnKB8NdFGXSvxXz7@cluster0.maweq.mongodb.net/schinder?retryWrites=true&w=majority');

    mongoose.connection.on('connected', () => {
        console.log(`connected to mongoDB mongodb+srv://hamsa:lnKB8NdFGXSvxXz7@cluster0.maweq.mongodb.net/schinder?retryWrites=true&w=majority }`);
        winston.info(`connected to mongoDB mongodb+srv://hamsa:lnKB8NdFGXSvxXz7@cluster0.maweq.mongodb.net/schinder?retryWrites=true&w=majority }`);
    });


// mongoose.set('debug', true);

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB has occured ${ err }`);
  winston.error(`MongoDB has occured ${ err }`);
});

module.exports = app;
