// Import Librarys
const express = require('express');
const bodyParser = require('body-parser');

// Import Routes
const auth = require('./src/routes/authenticate');

// Local Constants
const app = express();
const port = 80;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Initialize and Apply Routes
app.use('/api/auth', auth);

// Serve Static Files
app.use('/', express.static('public'));
app.listen(port, () => console.log(`Server Listening on ${port}!`));