// Import Librarys
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
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

// Verify our users are authenticated
router.get('/login', (req, res) => {

    // Grab browsers cookies and grep database for their email
    document.findOne({ Email: req.cookies.Email }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);

        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.sendFile(path.join(__dirname, '../private/login.html'));
        } else {
            // Now grab their password and verify that works.
            // NOTE: Maybe this exposes users who are already authenticated to login's password. Maybe put the has there instead???
            // NOTE: Not really sure what the best method would be. Ive done some research before sounds like session ID's are the best way to go.
            // TODO: Replace with session IDs
            bcrypt.compare(req.cookies.Password, results.Password).then(function (correct_password) {
                // Password does not match hash in our database
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.sendFile(path.join(__dirname, '../private/login.html'));
                } else {
                    // This is a valid user email, redirect to appropriate dashboard.
                    if (results.Admin == "true") {
                        // IF admin return admin dashboard
                        res.sendFile(path.join(__dirname, '../private/admin/dashboard.html'));
                    } else {
                        // IF controller return controller dashboard
                        res.sendFile(path.join(__dirname, '../private/controller/dashboard.html'));
                    }
                }
            });
        }
    });
});

// Authenticate our users
router.post('/login', (req, res) => {
    document.findOne({ Email: req.body.Email }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);

        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.sendFile(path.join(__dirname, '../private/login.html'));
        } else {
            // Now grab their password and verify that works.
            bcrypt.compare(req.body.Password, results.Password).then(function (correct_password) {
                // Password does not match hash in our database
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.sendFile(path.join(__dirname, '../private/login.html'));
                } else {
                    // Update cookies
                    if (req.body.Rememberme) {
                        // Set email and password as cookie for five days.
                        res.cookie("Email", req.body.Email, { maxAge: 5 * 24 * 3600000, httpOnly: true });
                        res.cookie("Password", req.body.Password, { maxAge: 5 * 24 * 3600000, httpOnly: true });
                    } else {
                        // Set email and password as cookie for 18 hours.
                        res.cookie("Email", req.body.Email, { maxAge: 18 * 3600000, httpOnly: true });
                        res.cookie("Password", req.body.Password, { maxAge: 18 * 3600000, httpOnly: true });
                    }

                    // Redirect user with some logic :P
                    if (results.Admin == "true") {
                        // IF admin return admin dashboard
                        res.sendFile(path.join(__dirname, '../private/admin/dashboard.html'));
                    } else {
                        // IF controller return controller dashboard
                        res.sendFile(path.join(__dirname, '../private/controller/dashboard.html'));
                    }
                }
            });
        }
    });
});

// Remove cookies on client desktop
router.get('/logout', (req, res) => {
    // Remove all cookies and remove active session ID
    res.cookie("Email", null, { maxAge: 900000, httpOnly: true });
    res.cookie("Password", null, { maxAge: 900000, httpOnly: true });

    res.sendFile(path.join(__dirname, '../private/logout.html'));
});

// Register new users, only for admin.
router.get('/signup', (req, res) => {
    // Grab browsers cookies and grep database for their email
    document.findOne({ Email: req.cookies.Email }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);

        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.sendFile(path.join(__dirname, '../private/login.html'));
        } else {
            // Now grab their password and verify that works.
            // NOTE: Maybe this exposes users who are already authenticated to login's password. Maybe put the has there instead???
            // NOTE: Not really sure what the best method would be. Ive done some research before sounds like session ID's are the best way to go.
            // TODO: Replace with session IDs
            bcrypt.compare(req.cookies.Password, results.Password).then(function (correct_password) {
                // Password does not match hash in our database
                if (!correct_password) {
                    // This isnt a valid user, redirect to login.html
                    res.sendFile(path.join(__dirname, '../private/login.html'));
                } else {
                    if (results.Admin == "true") {
                        res.sendFile(path.join(__dirname, '../private/signup.html'));
                    } else {
                        res.redirect('/errors/401.html');
                    }
                }
            });
        }
    });
});

router.post('/signup', (req, res) => {
    // Check database if account already exists with that email.
    document.findOne({ Email: req.body.Email }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);

        // If we get no users under that email
        if (!results) {
            // Set email and password as cookie for 18 hours.
            // TODO: Do i want to do this if your alread signed in as admin? probably not if your an admin creating accounts
            res.cookie("Email", req.body.email, { maxAge: 18 * 3600000, httpOnly: true });
            res.cookie("Password", req.body.password, { maxAge: 18 * 3600000, httpOnly: true });

            // Keep local copy temporarily
            // NOTE: May be vulnerable to some memory scans... Not sure completly how bcrypt uses is but for now this is what i will do.
            var clearPass = req.body.Password;

            // Hash our clients password
            bcrypt.hash(clearPass, saltRounds).then(function (hash) {
                // Overwrite req.body.Password to new hash...
                req.body.Password = hash;

                // Create new_user object
                var new_user = new document({
                    First_Name: req.body.First_Name,
                    Last_Name: req.body.Last_Name,
                    Department: req.body.Department,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    // This value will always be false until further noted
                    // TODO: figure out how to make an admin profile generator.
                    Admin: "false"
                });

                // Commit new_user to database
                new_user.save();
                // Redirect to controller dashboard
                res.sendFile(path.join(__dirname, '../private/controller/dashboard.html'));
            });
        } else {
            // This is a valid user, redirect to login.
            res.sendFile(path.join(__dirname, '../private/login.html'));
        }
    });
});

// Dont expose this api in production only here because im to lazy to make a batch test scrpt for hashing my passwords.
// router.get('/hash/:password', (req, res) => {
// bcrypt.hash(req.params.password, saltRounds).then(function (hash) {
//     res.send(hash);
// });
// });


// Export router contents
module.exports = router;