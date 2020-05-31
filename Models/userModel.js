
const mongoose 				= require('mongoose');

// Create a Event schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name : 					{ type : String, required : true},
    password :		     	{ type : String, required : true},
    email : 				{ type : String, required : true },
    signInStatus :          { type : Boolean, default : false},
    creationDate : 			Date,
})



// on every save, update the created/modified date
UserSchema.pre('save', function(next) {
    // get the current date
    const currentDate = new Date();
  
    // if createdDate doesn't exist, add to that field
    if (!this.creationDate)
      this.creationDate = currentDate;
    next();
});
  
  
// Create a Model
const User = mongoose.model('User', UserSchema);


// Make User available everywhere in the app
module.exports = User;
