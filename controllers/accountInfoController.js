'use strict';
const accountInfo = require( '../models/accountInfo' );
console.log("loading the users account Controller")


// this displays all of the skills
exports.getAllAccounts = ( req, res ) => {
  console.log('in getAllAccounts')
  accountInfo.find( {} )
    .exec()
    .then( ( signIn ) => {
      res.render( 'signIn', {
        signIn:signIn
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'account information storaging complete' );
    } );
};


exports.saveAccount = ( req, res ) => {
  console.log("in saveSkill!")
  console.dir(req)
  let newAccount = new accountInfo( {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName
  } )

  console.log("skill = "+newAccount)

  newAccount.save()
    .then( () => {
      res.redirect( '/signIn' );
    } )
    .catch( error => {
      res.send( error );
    } );
};
