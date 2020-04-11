// Import Librarys
const express = require('express');

var MongooseClient = require('mongoose');
const document = require('../schema/departments');
const users = require('../schema/users');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Local Constants
let router = express.Router();


// Return all objects in database.
router.get('/all', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
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
        }    
    });    
});

// Get specific object in database.
router.get('/:id', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            // Search database for an object with proper id
            document.find({_id: req.params.id},(err, results) => {
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
        }    
    });
});

// Create new department in database.
router.post('/', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            // Check if user provided is an admin
            if(results.admin == 0) {
                res.send("Error <br>You must be an admin to use this feature!");
            } else {
                // Create new database document.
                var new_department = new document({
                    name: req.body.name
                });
            
                // Save database document.
                new_department.save();
    
                // TODO: What happens after I save the object?
                res.send("Done!");
            }
        }    
    });  
});

// Update object in database.
router.put('/', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            if(results.admin == 0) {
                res.send("Error <br>You must be an admin to use this feature!");
            } else {
                // Find an object by that id and update with req.body contents
                document.updateOne({_id: req.body.id}, req.body, (err) => {
                    // Check if there was an error
                    if (err) res.send("Error updating object in database");
                    // TODO: What happens after I update the object? Probably just a redirect
                    res.send("Object updated");
                });
            }
        }    
    });  
});

// Delete object in database.
router.delete('/', (req, res) => {
    // Verify client is a user in database
    users.findOne({ _id: req.cookies.id, session_token: req.cookies.session_token }, (err, results) => {
        // Handle any errors that might occure while reading databse.
        if (err) return console.error(err);
        // If we get no users under that email
        if (!results) {
            res.redirect('/api/v1/auth/login');
        } else {
            if(results.admin == 0) {
                res.send("Error <br>You must be an admin to use this feature!");
            } else {
                // Find object in database with contents of req.body and delete it.
                document.deleteOne(req.body, (err) => {
                    // Check if there were any errors
                    if (err) res.send(err);
                    // TODO: What happens after I delete the object? Probably just a redirect
                    res.send("Object Deleted");
                });
            }
        }    
    });  
})

// Export router contents
module.exports = router;