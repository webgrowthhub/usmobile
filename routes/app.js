var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check', function(req, res, next) {
  console.log("here");
});

module.exports = router;