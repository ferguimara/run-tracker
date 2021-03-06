// Require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
require('dotenv').config();


// Set up express app
const app = express();

// Connect to DB
require('./config/database')

// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', workoutsRouter);

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
    console.log('Hello');
});