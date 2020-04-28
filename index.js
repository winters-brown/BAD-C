// Import Librarys
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");

// Local Constants
const app = express();
const port = 8080;

// Import Routes
const auth = require("./src/routes/auth");
const admin = require("./src/routes/admin");
const controller = require("./src/routes/controller");
// const department = require("./src/routes/department");

// Enforce Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Set and manage cookies
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
// Begin using handelbars engine
app.engine("handlebars", exphbs());
// Implement our view engine
app.set("view engine", "handlebars");

// Initialize and Apply Routes for API
app.use("/api/v2/auth/", auth);
app.use("/api/v2/admin/", admin);
app.use("/api/v2/controller/", controller);
// app.use("/api/v2/department/", department);

// Serve Static Files
// app.use("/", app.render("index"));

// TODO: Do better here lol.
app.listen(port, () => console.log(`Server Listening on ${port}!`));
