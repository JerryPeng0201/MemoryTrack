var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Come to join us today!' });
});

module.exports = router;
