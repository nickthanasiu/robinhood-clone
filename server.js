const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017/rhc', {
  useNewUrlParser: true,
});

// App Setup
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
router(app);

// Server Setup
const port = 3090;
const server = http.createServer(app);
server.listen(port);
