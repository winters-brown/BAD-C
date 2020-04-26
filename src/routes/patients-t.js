// Import Librarys
const express = require("express");
const path = require("path");

// Local Constants
var MongooseClient = require("mongoose");
const document = require("../schema/patients");
const users = require("../schema/users");

// Configure our Mongoose Client
MongooseClient.connect("mongodb://localhost/bad-c", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let router = express.Router();

router.get("/new", (req, res) => {
	users.findOne(
		{ _id: req.cookies.id, session_token: req.cookies.session_token },
		(err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);
			// If we get no users under that email
			if (!results) {
				// This isnt a valid user, redirect to login.html
				res.redirect("/api/v1/auth/login");
			} else {
				// Redirect user with some logic :P
				if (results.admin == 1) {
					res.sendFile(
						path.join(
							__dirname +
								"../../../private/admin/new_patient.html"
						)
					);
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v1/auth/login");
				}
			}
		}
	);
});

router.post("/new", (req, res) => {
	users.findOne(
		{ _id: req.cookies.id, session_token: req.cookies.session_token },
		(err, results) => {
			// Handle any errors that might occure while reading databse.
			if (err) return console.error(err);
			// If we get no users under that email
			if (!results) {
				// This isnt a valid user, redirect to login.html
				res.redirect("/api/v1/auth/login");
			} else {
				// Redirect user with some logic :P
				if (results.admin == 1) {
					res.send(req.body);
				} else {
					// IF controller return controller dashboard
					res.redirect("/api/v1/auth/login");
				}
			}
		}
	);
});

// Export router contents
module.exports = router;
