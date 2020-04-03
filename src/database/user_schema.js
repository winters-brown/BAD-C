var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var User_Schema = new Schema({
    First_Name: String,
    Last_Name: String,
    Email: String,
    Password: String,
    Admin: String
});

module.exports = MongooseClient.model("Users", User_Schema);