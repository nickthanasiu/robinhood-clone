const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const router = require('./router');


// App Setup
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
router(app);

// Server Setup
const port = 3090;
const server = http.createServer(app);
server.listen(port);
