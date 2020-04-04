// Import Librarys
const express = require('express');
var MongooseClient = require('mongoose');
const document = require('../database/department_schema');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect Mongoose Client
var database = MongooseClient.connection;

// Check for connection errors
database.on('error', console.error.bind(console, 'connection error:'));

// Local Constants
let router = express.Router();

router.get('/all', (req, res) => {
    // TODO: Secure this api behind verification wall.
    document.find((err, result) => {
        res.send(result);
    });
});

// Export router contents
module.exports = router;