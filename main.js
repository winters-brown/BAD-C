// Import Librarys
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Import Routes
const auth = require('./src/routes/authenticate');
const dept = require('./src/routes/departments');

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
app.use('/api/auth', auth);
app.use('/api/dept', dept);

// Serve Static Files
app.use('/', express.static('public'));
app.listen(port, () => console.log(`Server Listening on ${port}!`));