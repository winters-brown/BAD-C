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

    res.cookie("email", req.body.email, { maxAge: 900000, httpOnly: true });
    res.cookie("password", req.body.password, { maxAge: 900000, httpOnly: true });
    // TODO: Preform some action based on credentials.
    // IF admin return admin dashboard
    // IF controller return controller dashboard
    res.send(req.body);
});

router.get('/logout', (req, res) => {
    // Remove all cookies and remove active session ID
    res.cookie("email", null, { maxAge: 900000, httpOnly: true });
    res.cookie("password", null, { maxAge: 900000, httpOnly: true });

    // TODO: Make a custom response
    res.send("You are now logged out!")
});



// Export router contents
module.exports = router;