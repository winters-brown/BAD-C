// Import Librarys
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

// Local Constants
var MongooseClient = require("mongoose");
const users = require("../schema/users");
const patients = require("../schema/patients");
const document = require("../schema/records");

// Configure our Mongoose Client
MongooseClient.connect("mongodb://localhost/bad-c", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Access our global router object.
let router = express.Router();

router.get("/", (req, res) => {
    // Store client cookies locally.
    const kID = req.cookies.id;
    const kSession_token = req.cookies.session_token;

    // Build our query for later.
    var query = {
        _id: kID,
        session_token: kSession_token,
    };

    // Verify query is not null
    if (query._id == null && query.session_token == null) {
        // User hasent logged in yet or users session_token is exprired.
        res.redirect("/api/v2/auth/login");
    } else {
        // Search our database with query
        users.findOne(query, (err, results) => {
            // Handle any errors that might occure while reading databse.
            if (err) return console.error(err);

            // No user exists with that id and session_token.
            if (!results) {
                res.redirect("/api/v2/auth/login");
            } else {
                // Check if our user is an admin.
                if (results.admin == 1) {
                    // Redirect our admin to their dashboard
                    res.render("admin/dashboard", {
                        title: "BAD-C | Admin Dasbhoard",
                    });
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.get("/create", (req, res) => {
    // Store client cookies locally.
    const kID = req.cookies.id;
    const kSession_token = req.cookies.session_token;

    // Build our query for later.
    var query = {
        _id: kID,
        session_token: kSession_token,
    };

    // Verify query is not null
    if (query._id == null && query.session_token == null) {
        // User hasent logged in yet or users session_token is exprired.
        res.redirect("/api/v2/auth/login");
    } else {
        // Search our database with query
        users.findOne(query, (err, results) => {
            // Handle any errors that might occure while reading databse.
            if (err) return console.error(err);

            // No user exists with that id and session_token.
            if (!results) {
                res.redirect("/api/v2/auth/login");
            } else {
                // Check if our user is an admin.
                if (results.admin == 1) {
                    patients.find(
                        { department: results.department },
                        (err, results) => {
                            console.log(results);
                            var my_patients = new Array();

                            for (let step = 0; step < results.length; step++) {
                                var temp = {
                                    _id: results[step]._id,
                                    first_name: results[step].first_name,
                                    last_name: results[step].last_name,
                                    department: results[step].department,
                                };
                                my_patients.push(temp);
                            }

                            res.render("admin/records/create", {
                                error: err,
                                my_patients,
                            });
                        }
                    );
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.get("/create/:id", (req, res) => {
    // Store client cookies locally.
    const kID = req.cookies.id;
    const kSession_token = req.cookies.session_token;

    // Build our query for later.
    var query = {
        _id: kID,
        session_token: kSession_token,
    };

    // Verify query is not null
    if (query._id == null && query.session_token == null) {
        // User hasent logged in yet or users session_token is exprired.
        res.redirect("/api/v2/auth/login");
    } else {
        // Search our database with query
        users.findOne(query, (err, results) => {
            // Handle any errors that might occure while reading databse.
            if (err) return console.error(err);

            // No user exists with that id and session_token.
            if (!results) {
                res.redirect("/api/v2/auth/login");
            } else {
                // Check if our user is an admin.
                if (results.admin == 1) {
                    patients.find({ _id: req.params.id }, (err, results) => {
                        var patient = new Array();

                        for (let step = 0; step < results.length; step++) {
                            var temp = {
                                _id: results[step]._id,
                                first_name: results[step].first_name,
                                last_name: results[step].last_name,
                                department: results[step].department,
                                behaviour_prompt:
                                    results[step].behaviour_prompt,
                                behaviour_question_type:
                                    results[step].behaviour_question_type,
                            };

                            patient.push(temp);

                            res.render("admin/records/create", {
                                error: err,
                                patient,
                            });
                        }
                    });
                }
            }
        });
    }
});

router.post("/create", (req, res) => {
    res.send(req.body);
});

router.get("/manage", (req, res) => {
    // Store client cookies locally.
    const kID = req.cookies.id;
    const kSession_token = req.cookies.session_token;

    // Build our query for later.
    var query = {
        _id: kID,
        session_token: kSession_token,
    };

    // Verify query is not null
    if (query._id == null && query.session_token == null) {
        // User hasent logged in yet or users session_token is exprired.
        res.redirect("/api/v2/auth/login");
    } else {
        // Search our database with query
        users.findOne(query, (err, results) => {
            // Handle any errors that might occure while reading databse.
            if (err) return console.error(err);

            // No user exists with that id and session_token.
            if (!results) {
                res.redirect("/api/v2/auth/login");
            } else {
                // Check if our user is an admin.
                if (results.admin == 1) {
                    // Redirect our admin to their dashboard
                    res.render("admin/records/update", {
                        title: "BAD-C | Admin Dasbhoard",
                    });
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

// Export router contents
module.exports = router;
