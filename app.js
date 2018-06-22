const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var signInRouter = require('./routes/signIn');
var privateRouter = require('./routes/private');
var diaryRouter = require('./routes/diary');
var photoRouter = require('./routes/photo');
var videoRouter = require('./routes/video');
var uploadRouter = require('./routes/upload');


//codes for authentication
// here we set up authentication with passport
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

var app = express();

const userInfoController = require('./controllers/userInfoController')
const accountInfoController = require('./controllers/accountInfoController')

//Test whether the mongoose database can work
const mongoose = require( 'mongoose');
mongoose.connect( 'mongodb://localhost/MemoryTrack' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Add the authentication routes
//visit this route to start the google authentication
//passport will sent you to google to get authenticate
//then will send the browser back to authorized page
app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

// route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/loginerror'
        }));

app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/loginerror'
        }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      return next();
    }

    console.log("user has not been authenticated...")
    // if they aren't redirect them to the home page
    res.redirect('/login');
}


app.use('/', indexRouter);
app.use('/users', userInfoController.getAllUsers);
app.use('/private', privateRouter);
app.use('/diary', diaryRouter);
app.use('/photo', photoRouter);
app.use('/video', videoRouter);
app.use('/upload', uploadRouter);

//new code for authentication
app.use(passport.initialize());
app.use(passport.session());


app.get('/signIn', accountInfoController.getAllAccounts);
app.post('/saveSignIn', accountInfoController.saveAccount );

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

module.exports = app;
