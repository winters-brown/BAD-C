// Import Librarys
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// Local Constants
const app = express();
const port = 8080;

// Import Routes
const auth = require("./src/routes/auth");
const admin = require("./src/routes/admin");
const controller = require("./src/routes/controller");

// Enforce Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Set and manage cookies
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());

// Initialize and Apply Routes for API
app.use("/api/v2/auth/", auth);
app.use("/api/v2/admin/", admin);
app.use("/api/v2/controller/", controller);

// Serve Static Files
app.use("/", express.static("public"));

// TODO: Do better here lol.
app.listen(port, () => console.log(`Server Listening on ${port}!`));
