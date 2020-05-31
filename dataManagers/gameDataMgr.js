const Game = require('../Models/gameModel');
const mongoose = require('mongoose')

const createGame = async(gameJSON)=>{
    try {
        let newGame = new Game;
        newGame.score = gameJSON.score;
        newGame.name = gameJSON.name;
        newGame.uid = gameJSON.uid;
        await newGame.save()
        return {"status":true, "message":"Successfull Creation", "data":newGame}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}


const updateGame = async(modGameJSON, game_id)=>{
    try {
        let gameObject = await Game.findById(mongoose.Types.ObjectId(game_id))
        if(gameObject){
            if(modGameJSON.hasOwnProperty('score'))
                gameObject.score = modGameJSON.score
            if(modGameJSON.hasOwnProperty('name'))
                gameObject.name = modGameJSON.name
            gameObject.modifiedDate = new Date();
            await gameObject.save()
            return {"status":true, "message":"Updated Successfully", "data":gameObject};
        }
        return {"status":false, "message":"User not found, enter valid email/password"}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}

const getGames = async(filters)=>{
    try {
        let query = {}
        if(filters.hasOwnProperty('uid'))
            query.uid = mongoose.Types.ObjectId(filters.uid)
        if(filters.hasOwnProperty('game_id'))
            query._id = mongoose.Types.ObjectId(filters.game_id)
        if(filters.hasOwnProperty('name'))
            query.name = filters.name;
        let games = await Game.find(query).sort({"score":-1})
        return {"status":true, "message":"Fetched Successfully", "data":games};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}


const removeGame = async(game_id)=>{
    try {
        await Game.findByIdAndRemove(mongoose.Types.ObjectId(game_id));
        return {"status":true, "message":"Deleted Successfully"};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}

module.exports ={
    createGame,
    updateGame,
    getGames,
    removeGame
}