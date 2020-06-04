// Import Librarys
const express = require("express");

// Local Constants
var MongooseClient = require("mongoose");
const users = require("../schema/users");
const document = require("../schema/patients");
const departments = require("../schema/departments");

// Configure our Mongoose Client
MongooseClient.connect("mongodb://localhost/bad-c", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Access our global router object.
let router = express.Router();

// Export router contents
module.exports = router;

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

						res.render("admin/patient/create", {
							error: err,
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
					let new_patient = new document(req.body);
					new_patient.save();
					res.redirect("/api/v2/patient/create");
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v2/controller/");
				}
			}
		});
	}
});
