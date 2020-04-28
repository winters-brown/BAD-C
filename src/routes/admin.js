// Import Librarys
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

// Local Constants
var MongooseClient = require("mongoose");
const users = require("../schema/users");

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
		res.redirect("/api/v2/auth/login.html");
	} else {
		// Search our database with query
		users.findOne(query, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);

			// No user exists with that id and session_token.
			if (!results) {
				res.redirect("/api/v2/auth/login.html");
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
		res.redirect("/api/v2/auth/login.html");
	} else {
		// Search our database with query
		users.findOne(query, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);

			// No user exists with that id and session_token.
			if (!results) {
				res.redirect("/api/v2/auth/login.html");
			} else {
				// Check if our user is an admin.
				if (results.admin == 1) {
					res.render("admin/users/new", {
						title: "BAD-C | New User",
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
		res.redirect("/api/v2/auth/login.html");
	} else {
		// Search our database with query
		users.findOne(query, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);

			// No user exists with that id and session_token.
			if (!results) {
				res.redirect("/api/v2/auth/login.html");
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
							});

							// TODO: Redirect with a notification
							res.redirect("/api/v2/admin/");
						} else {
							console.log("error");
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
					res.render("admin/users/update", {
						title: "BAD-C | Update Users",
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
					res.json(req.body);
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
