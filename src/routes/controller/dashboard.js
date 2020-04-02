// Import Librarys
const express = require('express');

// Local Constants
let router = express.Router();

router.get('/:department/:patientID', (req, res) => {
    // TODO: Verify user is controller

    // If user is a controller pull patient full profile
    // Generate ./public/controller/collection with patient profile.

    // Redirect if not to login page
});

// Export router contents
module.exports = router;