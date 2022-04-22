var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var app = express();
var patientsRouter = require('./routes/patients');
var doctorsRouter = require('./routes/doctors')
var appointmentsRouter = require('./routes/appointements')
var usersRouter = require('./routes/users')
var usersViewRouter = require('./routes/userview')
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/patients', patientsRouter)
app.use('/doctors', doctorsRouter)
app.use('/appointments', appointmentsRouter)
app.use('/users', usersRouter)
app.use('/userview', usersViewRouter)

// catch 404 and forward to error handler




module.exports = app;
