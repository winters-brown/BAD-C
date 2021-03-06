// Import Librarys
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

// Local Constants
var MongooseClient = require("mongoose");
const users = require("../schema/users");
const departments = require("../schema/departments");

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
                    departments.find((err, results) => {
                        var my_departments = new Array();

                        for (let step = 0; step < results.length; step++) {
                            var temp = {
                                _id: results[step]._id,
                                name: results[step].name,
                            };
                            my_departments.push(temp);
                        }
                        res.render("admin/users/create", {
                            title: "BAD-C | New User",
                            my_departments,
                        });
                    });
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.post("/create", (req, res) => {
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
                    users.findOne({ email: req.body.email }, (err, results) => {
                        // Handle any errors that might occure while reading databse.
                        if (err) return console.error(err);

                        // No user exists with that email.
                        if (!results) {
                            bcrypt.hash(req.body.password, 10, function (
                                err,
                                hash
                            ) {
                                var query = new users({
                                    // Personal information
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    // Login Information
                                    email: req.body.email,
                                    // TODO: NOOOOOO Curses, I have to encrypt this...
                                    password: hash,
                                    // Does user have admin privelages
                                    admin: req.body.admin,
                                    // Department that user belongs to.
                                    // TODO: Should this be an array given that one user could manage multiple departments???
                                    department: req.body.department,
                                    // Approved login session token
                                    session_token: "null",
                                });

                                query.save();
                                // TODO: Redirect with a notification
                                res.redirect("/api/v2/admin/");
                            });
                        } else {
                        }
                    });
                } else {
                    // If controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.get("/update", (req, res) => {
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
                // TODO: Create custom error for login.html
                res.redirect("/api/v2/auth/login");
            } else {
                // Check if our user is an admin.
                if (results.admin == 1) {
                    // TODO: Figure out the input here
                    users.find((err, results) => {
                        var my_users = new Array();

                        for (let step = 0; step < results.length; step++) {
                            var temp = {
                                _id: results[step]._id,
                                first_name: results[step].first_name,
                                last_name: results[step].last_name,
                                email: results[step].email,
                                department: results[step].department,
                            };
                            my_users.push(temp);
                        }

                        res.render("admin/users/update", {
                            title: "BAD-C | Manage User",
                            my_users,
                        });
                    });
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.post("/update", (req, res) => {
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
                    // TODO: Figure out the input here
                    users.find((err, results) => {
                        var my_users = new Array();

                        for (let step = 0; step < results.length; step++) {
                            var temp = {
                                _id: results[step]._id,
                                first_name: results[step].first_name,
                                last_name: results[step].last_name,
                                email: results[step].email,
                                department: results[step].department,
                            };
                            my_users.push(temp);
                        }

                        res.render("admin/users/update", {
                            title: "BAD-C | Manage User",
                            my_users,
                        });
                    });
                } else {
                    // IF controller return controller dashboard
                    res.redirect("/api/v2/controller/");
                }
            }
        });
    }
});

router.get("/delete/:id", (req, res) => {
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
                    var new_query = {
                        _id: req.params.id,
                    };

                    users.deleteOne(new_query, (err2, results2) => {
                        res.redirect("/api/v2/admin/update");
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
