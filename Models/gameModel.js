
const mongoose 				= require('mongoose');
const User = require('./userModel')

// Create a Event schema
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    name        : 			{   type : String, required : true},
    uid         :           {   type : Schema.Types.ObjectId, ref: 'User', required  :true },
    score       :           {   type: Number, required : true},
    modifiedDate:           Date,
    creationDate: 			Date,
})



// on every save, update the created/modified date
GameSchema.pre('save', function(next) {
    // get the current date
    const currentDate = new Date();
    // change the modified field to current date
    this.modifiedDate = currentDate;
    // if createdDate doesn't exist, add to that field
    if (!this.creationDate)
      this.creationDate = currentDate;
    next();
});
  
  
// Create a Model
const Game = mongoose.model('Game', GameSchema);


// Make Game available everywhere in the app
module.exports = Game;
