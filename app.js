const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const users = {
    'clinton': 'test',
    'amy': 'password'
};

// view engine setup
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

app.get('/api/hello',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);

app.listen(3000, function(){
  console.log('Started express application!')
});
