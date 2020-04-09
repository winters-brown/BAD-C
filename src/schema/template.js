var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Template = new Schema({

});

module.exports = MongooseClient.model("Template", Template);