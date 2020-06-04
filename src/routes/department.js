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

							res.redirect("/api/v2/department/create");
						} else {
							res.render("admin/department/create", {
								error: "Department already exists!",
							});
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
				res.redirect("/api/v2/department/delete");
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
					document.find((err, results) => {
						var my_departments = new Array();

						for (let step = 0; step < results.length; step++) {
							var temp = {
								_id: results[step]._id,
								name: results[step].name,
							};
							my_departments.push(temp);
						}

						res.render("admin/department/update", {
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

router.get("/update/:id/:name", (req, res) => {
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
				// TODO: Search database for the following data and update its content.
				const temp_id = req.params.id;
				const temp_name = req.params.name;
				document.findOneAndUpdate(
					{ _id: temp_id.toString() },
					{ name: temp_name.toString() },
					(err, result) => {
						res.redirect("/api/v2/department/update");
					}
				);
			}
		});
	}
});

router.get("/delete", (req, res) => {
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
					document.find((err, results) => {
						var my_departments = new Array();

						for (let step = 0; step < results.length; step++) {
							var temp = {
								_id: results[step]._id,
								name: results[step].name,
							};
							my_departments.push(temp);
						}

						res.render("admin/department/delete", {
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
					document.deleteOne(new_query, (err2, results2) => {
						res.redirect("/api/v2/department/delete");
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
