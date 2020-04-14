// Import Librarys
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

var MongooseClient = require('mongoose');
const document = require('../schema/users');

// Rounds on password for bcrypt
const saltRounds = 10;

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Local Constants
let router = express.Router();

// Redirect to index page
router.get('/login', (req, res) => {
    // Search database for email
    document.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                // IF admin return admin dashboard
                res.sendFile(path.join(__dirname, '../../private/admin/dashboard.html'));
            } else {
                // IF controller return controller dashboard
                res.redirect('/api/v1/controller/dashboard');
            }
        }
    });
});

// Verify user email and password match
router.post('/login', (req, res) => {
    // Capture Login Credentials
    let client = {
        email: req.body.email,
        password: req.body.password
    };

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
            bcrypt.compare(req.body.password, results.password).then((correct_password) => {
                // Password does not match hash in our database
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.redirect('/');
                } else {
                    // Update browser cookies for 18 hours.
                    // TEST
                    results.session_token = uuid.v4();
                    results.save();

                    res.cookie("id", results._id, { maxAge: 2 * 24 * 3600000, httpOnly: true });
                    res.cookie("session_token", results.session_token, { maxAge: 2 * 24 * 3600000, httpOnly: true });

                    // Redirect user with some logic :P
                    if (results.admin == 1) {
                        // IF admin return admin dashboard
                        res.sendFile(path.join(__dirname, '../../private/admin/dashboard.html'));
                    } else {
                        // IF controller return controller dashboard
                        res.redirect('/api/v1/controller/dashboard');
                    }
                }
            });
        }
    });
});

// Remove cookies and destroy session token stored.
router.get('/logout', (req, res) => {
    if (req.cookies.id == "j:null") {
        res.sendFile(path.join(__dirname, '../../private/logout.html'));
    } else {
        // Search database for _id
        document.findOne({ _id: req.cookies.id }, (err, results) => {
            // Handle any errors that might occure while reading databse.
            if (err) return console.error(err);
            // If we get no users under that id
            if (!results) {
                res.sendFile(path.join(__dirname, '../../private/logout.html'));
            } else {
                results.session_token = "null";
                results.save();
                // Set cookies to be null. Protects clients personal identification information.
                res.cookie("session_token", null, { maxAge: 900000, httpOnly: true });

                res.sendFile(path.join(__dirname, '../../private/logout.html'));
            }
        });
    }
});

// Export router contents
module.exports = router;