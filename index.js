// Import Librarys
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Import Routes
const user = require('./src/routes/users');
const auth = require('./src/routes/auth');
const admin = require('./src/routes/admin');
const debug = require('./src/routes/debug');
const records = require('./src/routes/records');
const controller = require('./src/routes/controller');
const departments = require('./src/routes/departments');

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
app.use('/api/v1/users/', user);
app.use('/api/v1/auth/', auth);
app.use('/api/v1/admin/', admin);
app.use('/api/v1/debug/', debug);
app.use('/api/v1/records/', records);
app.use('/api/v1/controller/', controller);
app.use('/api/v1/dept/', departments);

// Serve Static Files
app.use('/', express.static('public'));

// TODO: Do better here lol.
app.listen(port, () => console.log(`Server Listening on ${port}!`));