
var express = require('express');
var router = express.Router();

// Get data
router.get('/', function(req, res, next) {
  res.send({mydata: 'jai sri ram'});
});

module.exports = router;
