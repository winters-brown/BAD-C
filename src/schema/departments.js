var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Departments = new Schema({
    name: String
});

module.exports = MongooseClient.model("Departments", Departments);