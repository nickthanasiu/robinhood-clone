const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017/rhc', {
  useNewUrlParser: true,
});

// App Setup
app.use(session({
  secret: 'specialsecretstring',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoose.connection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }

}));
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.login = req,isAuthenticated();
  res.locals.session = req.session;
  next();
});

router(app);

// Server Setup
const port = 3090;
const server = http.createServer(app);
server.listen(port);
