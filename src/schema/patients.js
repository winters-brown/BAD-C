var MongooseClient = require("mongoose");
var Schema = MongooseClient.Schema;

var Patient = new Schema({
	first_name: String,
	last_name: String,
	behaviour_prompt: [String],
	behavoiur_question_type: [String],
});

module.exports = MongooseClient.model("Patient", Patient);
