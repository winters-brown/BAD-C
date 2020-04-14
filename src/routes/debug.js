// Import Librarys
const express = require('express');
const bcrypt = require('bcrypt');

// Local Constants
// Rounds on password for bcrypt
const saltRounds = 10;
// Express Router Object
let router = express.Router();

router.get('/', (req, res) => {
    // TODO: Fill with usefull information B')
    res.send("BAD-C DEBUG");
});

router.post('/', (req, res) => {
    res.json(req.body);
});

router.put('/', (req, res) => {
    res.json(req.body);
});

router.delete('/', (req, res) => {
    res.json(req.body);
});

// TODO: Do not expose in production!!!
router.get('/hash/:password', (req, res) => {
    bcrypt.hash(req.params.password, saltRounds).then(function (hash) {
        res.send(hash);
    });
});
// Export router contents
module.exports = router;