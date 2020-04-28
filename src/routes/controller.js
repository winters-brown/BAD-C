// Import Librarys
const express = require("express");
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
		res.redirect("/login.html");
	} else {
		// Search our database with query
		users.findOne(query, (err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);

			// No user exists with that id and session_token.
			if (!results) {
				// TODO: Create custom error for login.html
				res.redirect("/login.html");
			} else {
				// Check if our user is an admin.
				if (results.admin == 1) {
					// Redirect our admin to their dashboard
					res.redirect("/api/v2/admin/");
				} else {
					// If controller return controller dashboard
					res.sendFile(
						path.join(
							__dirname,
							"../../private/controller/dashboard.html"
						)
					);
				}
			}
		});
	}
});

// Export router contents
module.exports = router;
