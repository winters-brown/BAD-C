var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Patient = new Schema({
    first_name: String,
    last_name: String,
    behaviour_prompt: [String],
    // Can be two types ["Counter", "True or False"]
    behavoiur_question_type: [String]
});

module.exports = MongooseClient.model("Patient", Patient);