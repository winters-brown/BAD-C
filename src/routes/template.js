// Import Librarys
const express = require('express');

// Local Constants
var MongooseClient = require('mongoose');
const users = require('../schema/users');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

let router = express.Router();




// Export router contents
module.exports = router;