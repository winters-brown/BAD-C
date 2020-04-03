var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Department_Schema = new Schema({
    Name: String
});

module.exports = MongooseClient.model("Departments", Department_Schema);