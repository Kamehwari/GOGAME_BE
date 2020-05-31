
const Validator = require('jsonschema').Validator;

const schemaValidator = async(json , schema)=>{
    try {
        let v = new Validator();
        let validatedResult = v.validate(json, schema);
        if(validatedResult.errors.length){
            validatedResult.errors= validatedResult.errors.map(error =>{
                return error.stack
            })
        }
        return validatedResult.errors;
    } catch (error) {
        throw error;
    }
}

const sendResponse = async(res, code, msg, objectKey = data, objectValue = {})=>{
    try {
        let response = {
            code : code,
            message : msg,  
            [objectKey]: objectValue,
            lastFetchedDate:new Date()
        }
        res.status(code);
        res.json(response);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports ={
    schemaValidator,
    sendResponse,
}
