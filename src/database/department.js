// Import librarys
var fs = require('fs');

let mydata;

class Department {
    // Returns all possible departments
    static async get_all() {
        return new Promise((resolve, reject) => {
            fs.readFile('data/departments.json', 'utf8', function (err, data) {
                if (err) throw err;
                resolve(JSON.parse(data));
            });
        });
    }
}

// Department.get_all().then((data) => {
//     // Handle & use data obj as usual within this scope. Cannot pass outside of scope.
// });