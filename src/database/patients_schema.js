var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Patient_Schema = new Schema({
    First_Name: String,
    Last_Name: String,
    Behaviour_Prompts: [String],
    Behaviour_Type: [String],
});

module.exports = MongooseClient.model("Pateints", Patient_Schema);