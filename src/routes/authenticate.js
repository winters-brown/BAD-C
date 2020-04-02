// Import Librarys
const express = require('express');

// Local Constants
let router = express.Router();

// Login handler
router.post('/login', (req, res) => {
    // Capture form input
    var user = {
        "email": req.body.email,
        "password": req.body.password,
    };

    // TODO: Verify credentials


    // TODO: Preform some action based on credentials.
    // IF admin return admin dashboard
    // IF controller return controller dashboard
    res.send(req.body);
});

router.get('/logout', (req, res) => {
    // Remove all cookies and remove active session ID

    // TODO: Make a custom response
    res.send("You are now logged out!")
});

// Export router contents
module.exports = router;