// Import Librarys
const path = require('path');
const express = require('express');

var MongooseClient = require('mongoose');
const document = require('../schema/users');

// Rounds on password for bcrypt
const saltRounds = 10;

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect Mongoose Client
var database = MongooseClient.connection;

// Check for connection errors
database.on('error', console.error.bind(console, 'connection error:'));

// Local Constants
let router = express.Router();

// Redirect to index page
router.get('/', (req, res) => {
    res.redirect('/');
});

// Redirect to index page
router.get('/login', (req, res) => {
    res.redirect('/');
});

// Handle login page
router.post('/login', (req, res) => {
    // Capture Login Credentials
    let client = {
        email: req.body.email,
        password: req.body.password
    };

    // TODO: Remove later.
    console.table(client);

    // Search database for email
    document.findOne({ email: req.body.email }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Now grab their password from the database and verify that the provided password is correct.
            bcrypt.compare(req.body.Password, results.Password).then((correct_password) => {
                // Password does not match hash in our database
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.redirect('/');
                } else {
                    // Update browser cookies for 18 hours.
                    // TEST
                    console.log(results);

                    // TODO: Generate unique session_token
                    res.cookie("id", null, { maxAge: 18 * 3600000, httpOnly: true });
                    res.cookie("session_token", null, { maxAge: 18 * 3600000, httpOnly: true });
                }

                // TODO: Figure this one out
                // // Redirect user with some logic :P
                // if (results.admin == 1) {
                //     // IF admin return admin dashboard
                //     res.sendFile(path.join(__dirname, '../private/admin/dashboard.html'));
                // } else {
                //     // IF controller return controller dashboard
                //     res.sendFile(path.join(__dirname, '../private/controller/dashboard.html'));
                // }
            });
        }
    });
});

// Verify user email and password match
router.get('/logout', (req, res) => {
    // Set cookies to be null. Protects clients personal identification information.
    res.cookie("id", null, { maxAge: 900000, httpOnly: true });
    res.cookie("session_token", null, { maxAge: 900000, httpOnly: true });

    res.sendFile(path.join(__dirname, '../../private/logout.html'));
});

// Export router contents
module.exports = router;