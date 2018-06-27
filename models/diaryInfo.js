'use strict';
const mongoose = require( 'mongoose' );

var diaryInfoSchema = mongoose.Schema( {
  diaryName: String,
  description: String
} );

module.exports = mongoose.model( 'diaryInfo', diaryInfoSchema );
