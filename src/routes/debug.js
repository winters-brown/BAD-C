// Import Librarys
const express = require('express');

// Local Constants
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

router.get('/hash/:password', (req, res) => {
    bcrypt.hash(req.params.password, saltRounds).then(function (hash) {
        res.send(hash);
    });
});
// Export router contents
module.exports = router;