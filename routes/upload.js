var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Upload your files ...' });
});

module.exports = router;
