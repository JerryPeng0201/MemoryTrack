'use strict';
const mongoose = require( 'mongoose' );

var accountInfoSchema = mongoose.Schema( {
  firstName: String,
  middleName: String,
  lastName: String
  /*gender: String,
  title: String,
  month: String,
  date: String,
  year: String,*/
} );

module.exports = mongoose.model( 'accountInfo', accountInfoSchema );
