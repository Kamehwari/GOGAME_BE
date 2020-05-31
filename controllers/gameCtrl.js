
const express   =       require('express');
const router    =       express.Router();
const userConfig = require('../schema/inputSchema').config
const {schemaValidator, sendResponse} = require("../helpers/utils");
const gameDataMgr = require('../dataManagers/gameDataMgr')

router.post('/games', async(req, res)=>{
    try {
        let gameJSON = req.body;
        let errorList = await schemaValidator(gameJSON, userConfig["games"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'game', errorList);
        }
        let result = await gameDataMgr.createGame(gameJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "game", result.data)
        }else{
            return sendResponse(res, 400, result.message, "game")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "game")
    }
})
router.put('/games/:games_id', async(req, res)=>{
    try {
        let gameJSON = req.body;
        let games_id = req.params.games_id;
        let errorList = await schemaValidator(gameJSON, userConfig["games"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'game', errorList);
        }
        let result = await gameDataMgr.updateGame(gameJSON, games_id);
        if(result.status){
            return sendResponse(res, 200, result.message, "game", result.data)
        }else{
            return sendResponse(res, 400, result.message, "game")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "game")
    }
})
router.delete('/games/:games_id', async(req, res)=>{
    try {
        let games_id = req.params.games_id;
        console.log(req.params)
        if(!games_id){
            return sendResponse(res, 406, "Missing Mandatory Information", 'game', "game id is missing in params");
        }
        let result = await gameDataMgr.removeGame(games_id);
        if(result.status){
            return sendResponse(res, 200, result.message, "game", result.data)
        }else{
            return sendResponse(res, 400, result.message, "game")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "game")
    }
})
router.get('/games', async(req, res)=>{
    try {
        let filters = (req.headers.filters) ? JSON.parse(req.headers.filters) : {}
        let result = await gameDataMgr.getGames(filters);
        if(result.status){
            return sendResponse(res, 200, result.message, "game", result.data)
        }else{
            return sendResponse(res, 400, result.message, "game")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "game")
    }
})

module.exports = router;