var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Records = new Schema({
    // Keep track of who submitted and when.
    timestamp: String,
    controller_submitted: String,
    // Patient Personal information.
    patient_id: String,
    first_name: String,
    last_name: String,
    // Patient Specific information.
    behaviour_prompt: [String],
    behavoiur_response: [String]
});

module.exports = MongooseClient.model("Records", Records);