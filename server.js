const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

// Express app
var app = express();

// Mongoose connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB connection error:', err));

  // View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const flightsRouter = require('./routes/flights');
const destinationsRouter = require('./routes/destinations');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flights', flightsRouter);
app.use('/flights', destinationsRouter);

// flight model
const Flight = require('./models/flight');


// Route handler
app.get('/flights/:flightNo', function(req, res) {
  Flight.findOne({ flightNo: req.params.flightNo }, function(err, flight) {
    if (err) {
      console.error(err);
      res.redirect('/flights');
    } else {
      res.render('show', { flight: flight });
    }
  });
});

app.put('/flights/:flightNo', function(req, res) {
  var updatedData = req.body;
  Flight.findOneAndUpdate({ flightNo: req.params.flightNo }, updatedData, { new: true }, function(err, flight) {
    if (err) {
      console.error(err);
      res.redirect('/flights');
    } else {
      res.redirect('/flights/' + flight.flightNo);
    }
  });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});



module.exports = app;

