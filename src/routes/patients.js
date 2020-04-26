// Import Librarys
const express = require('express');

// Local Constants
var MongooseClient = require('mongoose');
const document = require('../schema/patients');
const users = require('../schema/users');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

let router = express.Router();

router.get('/all', (req, res) => {
    // Search database for email
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                // Search departments ddatabase
                document.find((err, results) => {
                    // Handle any errors that might occure while reading databse.
                    if (err) return console.error(err);
                    // If we get no users under that email
                    if (!results) {
                        res.send("Error <br>Could not find any objects in database!");
                    } else {
                        // Return JSON object
                        res.json(results);
                    }
                });
            } else {
                // IF controller return controller dashboard
                res.redirect('/api/v1/auth/login');
            }
        }
    });
});

router.get('/:id', (req, res) => {
    // Search database for email
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                // Search database for an object with proper id
                document.find({ _id: req.params.id }, (err, results) => {
                    // Handle any errors that might occure while reading databse.
                    if (err) return console.error(err);
                    // If we get no users under that email
                    if (!results) {
                        res.send("Error <br>Could not find any objects in database!");
                    } else {
                        // Return JSON object
                        res.json(results);
                    }
                });
            } else {
                // IF controller return controller dashboard
                res.redirect('/api/v1/auth/login');
            }
        }
    });
});

router.put('/:id', (req, res) => {
    // Search database for email
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                // Find an object by that id and update with req.body contents
                document.updateOne({_id: req.body.id}, req.body, (err) => {
                    // Check if there was an error
                    if (err) res.send("Error updating object in database");
                    // TODO: What happens after I update the object? Probably just a redirect
                    res.send("Object updated");
                });
            } else {
                // IF controller return controller dashboard
                res.redirect('/api/v1/auth/login');
            }
        }
    });
});

router.get('/new', (req, res) => {
    // Search database for email
    res.send(req.cookies);

    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) { 
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                res.sendFile(path.join(__dirname + '../../private/admin/new_patient.html'));
            } else {
                // IF controller return controller dashboard
                res.redirect('/api/v1/auth/login');
            }
        }
    });
});

router.post('/new', (req, res) => {
    // Search database for email
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            // This isnt a valid user, redirect to login.html
            res.redirect('/');
        } else {
            // Redirect user with some logic :P
            if (results.admin == 1) {
                // Get new patient.
                let new_patient = new document(req.body);
                // Save new patient.
                new_patient.save();

                // Respond appropriately
                res.send("/api/v1/admin/dashboard");
            } else {
                res.redirect('/api/v1/auth/login');
            }
        }
    });
});

// Export router contents
module.exports = router;