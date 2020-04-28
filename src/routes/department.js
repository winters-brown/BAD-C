// Import Librarys
const express = require("express");
const path = require("path");

// Local Constants
var MongooseClient = require("mongoose");
const document = require("../schema/departments");
const users = require("../schema/users");

// Configure our Mongoose Client
MongooseClient.connect("mongodb://localhost/bad-c", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Access our global router object.
let router = express.Router();

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
					res.render("admin/department/create");
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
					const kName = req.body.name;

					var query = {
						name: kName,
					};

					document.findOne(query, (err, result) => {
						// Handle any errors that might occure while reading database.
						if (err) return console.error(err);

						if (!result) {
							var new_department = new document(query);
							new_department.save();

							res.json(new_department);
						} else {
							res.redirect("/api/v2/department/update");
						}
					});
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v2/controller/");
				}
			}
		});
	}
});

router.get("/read", (req, res) => {
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
				document.find((err, result) => {
					res.json(result);
				});
			}
		});
	}
});

router.get("/read/:id", (req, res) => {
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
				document.find({ _id: req.params.id }, (err, result) => {
					res.json(result);
				});
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
				res.redirect("/api/v2/auth/login");
			} else {
				// Check if our user is an admin.
				if (results.admin == 1) {
					res.render("admin/department/update");
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v2/controller/");
				}
			}
		});
	}
});

router.get("/delete", (req, res) => {
	// TODO: Complete this.
	res.send("GET /delete");
});

router.post("/delete/:id", (req, res) => {
	// TODO: Complete this.
	res.send("GET /delete/:id");
});

// Export router contents
module.exports = router;
