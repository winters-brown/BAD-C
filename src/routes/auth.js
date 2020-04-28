// Import Librarys
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const uuid = require("uuid");

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

router.get("/login", (req, res) => {
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
		res.render("login", { title: "BAD-C | Login" });
	} else {
		// Search our database with query
		users.findOne(query, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);

			// No user exists with that id and session_token.
			if (!results) {
				res.render("login", {
					title: "BAD-C | Login",
				});
			} else {
				// Check if our user is an admin.
				if (results.admin == 1) {
					// Redirect our admin to their dashboard
					res.redirect("/api/v2/admin/");
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v2/controller/");
				}
			}
		});
	}
});

router.post("/login", (req, res) => {
	// Store user input locally.
	const kEmail = req.body.email;
	const kPassword = req.body.password;

	// Build our query for later.
	var query = {
		email: kEmail,
	};

	// Search our database with our query
	users.findOne(query, (err, results) => {
		// Handle any errors that might occure while reading databse.
		if (err) return console.error(err);

		// No user exists with that email.
		if (!results) {
			res.render("login", {
				title: "BAD-C | Login",
				error: "Could not log you in. Please try again!",
			});
		} else {
			// Compare passwords with bcrypt
			bcrypt
				.compare(kPassword, results.password)
				.then((correct_password) => {
					// Password does not match hash in our database
					if (!correct_password) {
						res.render("login", {
							title: "BAD-C | Login",
							error: "Could not log you in. Please try again!",
						});
					} else {
						// Update browser cookies for 18 hours.
						results.session_token = uuid.v4();
						results.save();

						res.cookie("id", results._id, {
							maxAge: 2 * 24 * 3600000,
							httpOnly: true,
						});
						res.cookie("session_token", results.session_token, {
							maxAge: 2 * 24 * 3600000,
							httpOnly: true,
						});

						if (results.admin == 1) {
							res.redirect("/api/v2/admin/");
						} else {
							res.redirect("/api/v2/controller/");
						}
					}
				});
		}
	});
});

router.get("/logout", (req, res) => {
	if (req.cookies.id == "j:null") {
		res.render("logout", { title: "BAD-C | Logout" });
	} else {
		// Search database for _id
		users.findOne({ _id: req.cookies.id }, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);
			// If we get no users under that id
			if (!results) {
				res.render("logout", { title: "BAD-C | Logout" });
			} else {
				results.session_token = "null";
				results.save();
				// Set cookies to be null. Protects clients personal identification information.
				res.cookie("session_token", null, {
					maxAge: 900000,
					httpOnly: true,
				});

				res.render("logout", { title: "BAD-C | Logout" });
			}
		});
	}
});

// Export router contents
module.exports = router;
