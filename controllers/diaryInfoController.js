'use strict';
const diaryInfo = require( '../models/diaryInfo' );
console.log("loading the diary Controller")


// this displays all of the skills
exports.getAllDiarys = ( req, res ) => {
  console.log('in getAllDiary')
  diaryInfo.find( {} )
    .exec()
    .then( ( diary ) => {
      res.render( 'diary', {
        diaryInfo:diary
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'diary information storaging complete' );
    } );
};


exports.saveDiary = ( req, res ) => {
  console.log("in saveDiary!")
  console.dir(req)
  let newDiary = new diaryInfo( {
    diaryName: req.body.diaryName,
    description: req.body.description
  } )

  console.log("diary = "+newDiary)

  newDiary.save()
    .then( () => {
      res.redirect( '/diary' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.attachDiary = ( req, res, next ) => {
  console.log('in attachDiary')
  diaryInfo.find( {} )
    .exec()
    .then( ( diary ) => {
      res.locals.diarys = diary
      console.dir(res.locals)
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'skill promise complete' );
    } );
};

exports.deleteDiary = (req, res) => {
  console.log("in deleteDiary")
  let diaryName = req.body.deleteDiary
  if (typeof(diaryName)=='string') {
      diaryInfo.deleteOne({name:diaryName})
           .exec()
           .then(()=>{res.redirect('/diary')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(diaryName)=='object'){
      diaryInfo.deleteMany({name:{$in:diaryName}})
           .exec()
           .then(()=>{res.redirect('/diary')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(diaryName)=='undefined'){
      console.log("This is if they didn't select a skill")
      res.redirect('/diary')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown diaryName: ${diaryName}`)
  }

};
