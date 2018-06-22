'use strict';
const mongoose = require( 'mongoose' );

var userInfoSchema = mongoose.Schema( {
  firstName: String,
  middleName: String,
  lastName: String
} );

module.exports = mongoose.model( 'userInfo', userInfoSchema );
