// Import Librarys
const express = require('express');
const bcrypt = require('bcrypt');
var MongooseClient = require('mongoose');
const document = require('../database/user_schema');

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

router.get('/login', (req, res) => {
    document.findOne({ Email: req.cookies.Email }, (err, results) => {
        if (err) return console.error(err);
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/login.html');
        } else {
            bcrypt.compare(req.cookies.Password, results.Password).then(function (correct_password) {
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.redirect('/login.html');
                } else {
                    // This is a valid user email, redirect to appropriate dashboard.
                    if (results.Admin == "true") {
                        // IF admin return admin dashboard
                        res.redirect('/admin/dashboard.html');
                    } else {
                        // IF controller return controller dashboard
                        res.redirect('/controller/dashboard.html');
                    }
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    try {
        document.findOne({ Email: req.body.Email }, (err, results) => {
            if (err) return console.error(err);
            if (!results) {
                // This isnt a valid user, redirect to login.html
                res.redirect('/login.html');
            } else {
                // This is a valid user email, redirect to appropriate dashboard.
                // TODO: Preform some action based on credentials.
                // Save Credentials base on remember me box checked

                bcrypt.compare(req.body.Password, results.Password).then(function (correct_password) {
                    if (!correct_password) {
                        // This isnt a valid user, redirect to login.html
                        res.redirect('/login.html');
                    } else {
                        // Update cookies
                        if (req.body.Rememberme) {
                            // Set email and password as cookie for five days.
                            res.cookie("Email", req.body.Email, { maxAge: 5 * 24 * 3600000, httpOnly: true });
                            res.cookie("Password", req.body.Password, { maxAge: 5 * 24 * 3600000, httpOnly: true });
                        } else {
                            // Set email and password as cookie for 18 hours.
                            res.cookie("Email", req.body.email, { maxAge: 18 * 3600000, httpOnly: true });
                            res.cookie("Password", req.body.password, { maxAge: 18 * 3600000, httpOnly: true });
                        }

                        // Redirect user with some logic :P
                        if (results.Admin == "true") {
                            // IF admin return admin dashboard
                            res.redirect('/admin/dashboard.html');
                        } else {
                            // IF controller return controller dashboard
                            res.redirect('/controller/dashboard.html');
                        }
                    }
                });
            }
        });
    } catch (error) {
        res.redirect('/errors/501.html');
    }
});

router.get('/logout', (req, res) => {
    // Remove all cookies and remove active session ID
    res.cookie("Email", null, { maxAge: 900000, httpOnly: true });
    res.cookie("Password", null, { maxAge: 900000, httpOnly: true });

    // TODO: Make a custom response
    res.send("You are now logged out!")
});

router.post('/signup', (req, res) => {
    document.findOne({ Email: req.body.Email }, (err, results) => {
        if (err) return console.error(err);
        if (!results) {
            // Set email and password as cookie for 18 hours.
            res.cookie("Email", req.body.email, { maxAge: 18 * 3600000, httpOnly: true });
            res.cookie("Password", req.body.password, { maxAge: 18 * 3600000, httpOnly: true });

            // Keep local copy temporarily
            var clearPass = req.body.Password;

            bcrypt.hash(clearPass, saltRounds).then(function (hash) {
                req.body.Password = hash;
                var new_user = new document(req.body);

                new_user.save();
                res.redirect('/controller/dashboard.html')
            });


        } else {
            // This is a valid user, redirect to login.
            res.redirect('/login.html');
        }
    });
});

// router.get('/hash/:password', (req, res) => {
// bcrypt.hash(req.params.password, saltRounds).then(function (hash) {
//     res.send(hash);
// });
// });


// Export router contents
module.exports = router;