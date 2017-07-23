var express = require('express');
var router = express.Router();

var makePoloniexRequest = require('../public/classes/Poloneix').makePoloniexRequest;

router.get('/:cryptoPair', function (req, res) {
  makePoloniexRequest(req, res);
});

module.exports = router;
