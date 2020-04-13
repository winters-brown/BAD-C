// Import Librarys
const express = require('express');

// Local Constants
var MongooseClient = require('mongoose');
const document = require('../schema/departments');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

let router = express.Router();

router.get('/dashboard', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            res.send('Admin Dashboard');
        }    
    });    
});


router.get('/manage/users', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            res.send('Admin Manage Users');
        }    
    });    
});

router.get('/manage/departments', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            res.send('Admin Manage Departments');
        }    
    });    
});

router.get('/manage/patients', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            res.send('Admin Manage Pateints');
        }    
    });    
});




// Export router contents
module.exports = router;