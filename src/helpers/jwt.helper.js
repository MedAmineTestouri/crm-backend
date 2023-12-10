var jwt = require('jsonwebtoken');
const {setJWT,getJWT} =require("./redis.heper")
const {storeUserRefreshToken} =require("../model/user/User.model")

const createAccessJWT = async(email,_id)=>{

    try {
        var accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,{expiresIn : '15m'});
        await setJWT(accessJWT,_id)
        return  Promise.resolve(accessJWT)
    } 
    catch (error) {
        return Promise.reject(error)
    }


}


const createRefreshJWT = async(payload,_id)=>{
    try {
        var refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET,{expiresIn : '30d'});
        
        await storeUserRefreshToken(_id,refreshJWT)
        return Promise.resolve(refreshJWT)
    } 
    catch (error) {
        return Promise.reject(error)
    }
    
}

module.exports = {createAccessJWT,createRefreshJWT}