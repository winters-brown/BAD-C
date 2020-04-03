var MongooseClient = require('mongoose');
var Schema = MongooseClient.Schema;

var Collections = new Schema({
    // This will be the patients _id
    pid: String,
    Timestamp: Date,
    Behaviour_Prompts: [String],
    Behaviour_Response: [String],
});

module.exports = MongooseClient.model("Collection", Collections);