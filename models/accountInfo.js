'use strict';
const mongoose = require( 'mongoose' );

var accountInfoSchema = mongoose.Schema( {
  firstName: String,
  middleName: String,
  lastName: String
} );

module.exports = mongoose.model( 'accountInfo', accountInfoSchema );
