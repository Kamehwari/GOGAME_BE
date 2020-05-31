
const User = require('../Models/userModel')
const mongoose = require('mongoose')
const md5 = require('md5');
const userSignIn = async(userJSON)=>{
    try {
       let userDetails = await User.findOne({"email": userJSON.email, "password": md5(userJSON.password).toString()})
       if(userDetails){
            userDetails.signInStatus = true;
            await userDetails.save();
            return {"status":true, "message":"Logged In Successfully", "data":userDetails}
       }return {"status":false, "message":"User not found, enter valid email/password"}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}
const userSignUp = async(userJSON)=>{
    try {
       let userDetails = await User.findOne({"email":userJSON.email})
       if(!userDetails){
        let user = new User;
        user.email = userJSON.email;
        user.name = userJSON.name;
        user.signInStatus = true;
        user.password = md5(userJSON.password);
        await user.save()
        return {"status":true, "message":"Logged In Successfully", "data":user}
       }return {"status":false, "message":"Email already exist"}
    } catch (error) {
        console.log("inside errr", error)
        throw {"status":false, "message":error.message}
    }
}
const userSignOut = async(userJSON)=>{
    try {
       await User.findByIdAndUpdate(mongoose.Types.ObjectId(userJSON.uid) , {"signInStatus":false})
       return {"status":true, "message":"Logged In Successfully"}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}

module.exports = {
    userSignIn,
    userSignOut,
    userSignUp
}