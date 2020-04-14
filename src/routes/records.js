// Import Librarys
const express = require('express');

// Local Constants
var MongooseClient = require('mongoose');
const document = require('../schema/records');
const users = require('../schema/users');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

let router = express.Router();

router.post('/new', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            new_report = new document(req.body);
            new_report.save();

            // TODO: make a proper response!
            res.send("Record Submited!");
        }    
    });    
});

// Export router contents
module.exports = router;