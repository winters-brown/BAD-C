    // Import Librarys
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Import Routes
const auth = require('./src/routes/auth');
const debug = require('./src/routes/debug');

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

// Initialize and Apply Routes for API
app.use('/api/v1/auth/', auth);
app.use('/api/v1/debug/', debug);

// Serve Static Files
app.use('/', express.static('public'));

// TODO: Do better here lol.
app.listen(port, () => console.log(`Server Listening on ${port}!`));