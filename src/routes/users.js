// Import Librarys
const express = require('express');

// Local Constants
var MongooseClient = require('mongoose');
const document = require('../schema/users');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

let router = express.Router();

// Get new user page
router.get('/new', (req, res) => {
     // Search database for email
     document.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // TODO: Impliment new user page.
            res.send("New User");
        }
    });
});

// Create new user
router.post('/new', (req, res) => {
    document.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token}, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            let new_user = new document(req.body);
            new_user.save();

            // TODO: Impliment user created page
            res.send("User Created");
        }
    });
});

// Update new user
router.put('/',(req, res) => {
    document.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token}, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            document.updateOne({_id: req.body.id}, req.body);
        }
    });
});

// Export router contents
module.exports = router;