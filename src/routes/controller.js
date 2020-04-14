// Import Librarys
const express = require('express');
const path = require('path');

var MongooseClient = require('mongoose');
const document = require('../schema/users');

// Rounds on password for bcrypt
const saltRounds = 10;

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Local Constants
let router = express.Router();

router.get('/dashboard', (req, res) => {
    // Search database for email
    document.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            res.sendFile(path.join(__dirname, '../../private/controller/dashboard.html'));
        }
    });
});

// Export router contents
module.exports = router;