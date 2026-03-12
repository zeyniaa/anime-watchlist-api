var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const animesRouter = require('./routes/anime');

const session = require('express-session');

//cobaa lagi
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.default || connectMongo; 

const passport = require('passport');
const localStrategy = require('./strategies/local');

const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const uri = "mongodb+srv://zeiniah_db_user:Niacantik01@belajarmongo.doofhpn.mongodb.net/?appName=belajarmongo";

mongoose.connect(uri)
  .then(() => console.log("Berhasil connect ke MongoDB Atlas!"))
  .catch(err => console.error("Gagal connect MongoDB Atlas:", err));


// Konfigurasi Session untuk disimpan langsung di MongoDB Atlas 
app.use(session({
  secret: 'rahasia_negara_123', 
  resave: false, 
  saveUninitialized: true, 
  store: MongoStore.create({ 
    mongoUrl: uri 
  })
}));

// Mengaktifkan Passport dan sistem Session-nya 
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy); 


passport.serializeUser((user, callback) => {
  callback(null, user);
});
passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/anime', animesRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

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
