// Import Librarys
const express = require("express");

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

// Export router contents
module.exports = router;

function template_authentication() {
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
					// IF controller return controller dashboard
					res.redirect("/api/v2/controller/");
				}
			}
		});
	}
}
