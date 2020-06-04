var MongooseClient = require("mongoose");
var Schema = MongooseClient.Schema;

var Patient = new Schema({
	first_name: String,
	last_name: String,
	department: String,
	behaviour_prompt: [String],
	behaviour_question_type: [String],
});

module.exports = MongooseClient.model("Patient", Patient);
