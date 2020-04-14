var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Users = new Schema({
    // Personal information
    first_name: String,
    last_name: String,
    // Login Information
    email: String,
    password: String,
    // Does user have admin privelages
    admin: Number,
    // Department that user belongs to.
    // TODO: Should this be an array given that one user could manage multiple departments???
    department: String,
    // Approved login session token
    session_token: String
});

module.exports = MongooseClient.model("Users", Users);