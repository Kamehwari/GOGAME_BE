
const express   =       require('express');
const router    =       express.Router();

const userConfig = require('../schema/inputSchema').config
const userDataMgr = require("../dataManagers/userDataMgr")
const {schemaValidator, sendResponse} = require("../helpers/utils")



router.put('/signIn', async(req, res)=>{
    try {
        let userJSON = req.body;
        let errorList = await schemaValidator(userJSON, userConfig["userSignIn"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'user', errorList);
        }
        let result = await userDataMgr.userSignIn(userJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "user", result.data)
        }else{
            return sendResponse(res, 400, result.message, "user")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "user")
    }
})

router.post('/signUp', async(req, res)=>{
    try {
        let userJSON = req.body;
        console.log(userJSON)
        let errorList = await schemaValidator(userJSON, userConfig["userSignUp"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'user', errorList);
        }
        let result = await userDataMgr.userSignUp(userJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "user", result.data)
        }else{
            return sendResponse(res, 400, result.message, "user")
        }
        
    } catch (error) {
        return sendResponse(res, 500, error.message, "user")
    }
})


router.put('/signOut', async(req, res)=>{
    try {
        let userJSON = req.body;
        let errorList = await schemaValidator(userJSON, userConfig["userSignOut"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'user', errorList);
        }
        let result = await userDataMgr.userSignOut(userJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "user", result.data)
        }else{
            return sendResponse(res, 400, result.message, "user")
        }
        
    } catch (error) {
        return sendResponse(res, 500, error.message, "user")
    }
})

module.exports = router;