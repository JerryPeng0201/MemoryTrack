var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Account', { title: 'Update your information ...' });
});

router.post('/', function(req, res, next) {
  const confirmPasscode=req.body.confirmPasscode
  const firstName=req.body.firstName
  const middleName=req.body.middleName
  const lastName=req.body.lastName
  const gender=req.body.gender
  const month=req.body.month
  const date=req.body.date
  const years=req.body.years
  const emailAddress=req.body.emailAddress
  const phoneNumber=req.body.phoneNumber
  res.render('Account', { title: 'Update your information ...',confirmPasscode:confirmPasscode,firstName:firstName,middleName:middleName,lastName:lastName,gender:gender,month:month,date:date,years:years,emailAddress:emailAddress,phoneNumber:phoneNumber});
});


module.exports = router;
