// Import Librarys
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Import Routes
const temp = require('./src/routes/template');

// Local Constants
const app = express();
const port = 8080;

// Enforce Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Set and manage cookies
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());

// Initialize and Apply Routes
app.use('/temp', temp);

// Serve Static Files
app.use('/', express.static('public'));
app.listen(port, () => console.log(`Server Listening on ${port}!`));