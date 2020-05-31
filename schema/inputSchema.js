exports.config ={
    userSignIn : {
        "id": "/userSignIn",
        "type": "object",
        "properties":{
           "email":{"type":"string", "required":true},
           "password":{"type":"string", "required":true}
        }
    },
    userSignUp:{
        "id":"/userSignUp",
        "type":"object",
        "properties":{
            "password":{"type":"string", "required":true},
            "email":{"type":"string", "required":true},
            "name":{"type":"string", "required":true}
        }
    },
    userSignOut:{
        "id": "/userSignOut",
        "type": "object",
        "properties":{
           "uid":{"type":"string", "required":true},
        }
    },
    games:{
        "id":"games",
        "type":"object",
        "properties":{
            "uid":{"type":"string", "required":true},
            "name":{"type":"string", "required":true},
            "score":{"type":"number", "required":true},
        }
    }
}