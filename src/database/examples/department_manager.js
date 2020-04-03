// Import librarys
var MongooseClient = require('mongoose');
const departments = require('../department_schema');

// Configure our Mongoose Client
MongooseClient.connect('mongodb://localhost/bad-c', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect Mongoose Client
var database = MongooseClient.connection;

// Check for connection errors
database.on('error', console.error.bind(console, 'connection error:'));

// Open Database and create new department
function new_department(obj) {
    database.once('open', () => {
        // Ensures there is no two departments with the same name
        var query = departments.findOneAndDelete(obj);
        var promise = query.exec();

        // Creates new department with object
        var new_department = new departments(obj);

        // Saves department
        new_department.save();
    });
}


// Open and read database
function get_departments() {
    database.once('open', () => {
        // Finds all entrys inside of departments.
        var query = departments.find();
        // Returns  query.
        var promise = query.exec().then((result, err) => {
            // Your query lives only inside this scope. :(
            if (err) console.error(err);
            console.log(result);
        });
        console.log(promise);
    });
}

function get_department(name) {
    database.once('open', () => {
        var query = departments.findOne({
            // Can get any parameter here i only chose name for human readability
            Name: name
        });

        var promise = query.exec().then((result, err) => {
            // Your query lives only inside this scope. :(
            if (err) console.error(err);
            console.log(result);
        });
    });
}

// Pass JSON object with parameter key Name.
// new_department({ Name: "NAME" });

// Demo only will have to scape goat contents
get_departments();

// Will return only one department
// get_department("NAME");