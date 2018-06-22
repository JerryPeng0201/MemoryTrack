'use strict';
const userInfo = require( '../models/userInfo' );
console.log("loading the users information Controller")


// this displays all of the skills
exports.getAllUsers = ( req, res ) => {
  console.log('in getAllUsers')
  userInfo.find( {} )
    .exec()
    .then( ( info ) => {
      res.render( 'Account', {
        usersInfo:info
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'user information storaging complete' );
    } );
};
