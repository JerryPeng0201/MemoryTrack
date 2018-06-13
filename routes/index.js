var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memory Track' });
});

router.post('/',function(req, res, next){
  console.log(req.body.account)
  const account = req.body.account
  res.render('index', { title: 'Memory Track', account:account});
})

module.exports = router;
