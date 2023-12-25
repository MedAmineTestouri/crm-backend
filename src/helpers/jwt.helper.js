var jwt = require('jsonwebtoken');
const {setJWT,getJWT} =require("./redis.heper")
const {storeUserRefreshToken} =require("../model/user/User.model")

const createAccessJWT = async(email,_id)=>{

    try {
        const accessJWT =  jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,{expiresIn : '1m'});
        
        await setJWT(accessJWT,_id)
         const id = await getJWT(accessJWT)
         
         
        return  Promise.resolve(accessJWT)
    } 
    catch (error) {
        return Promise.reject(error)
    }


}


const createRefreshJWT = async(email,_id)=>{
    try {
        var refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET,{expiresIn : '30d'});
        
        await storeUserRefreshToken(_id,refreshJWT)
        return Promise.resolve(refreshJWT)
    } 
    catch (error) {
        return Promise.reject(error)
    }
    
}

const verifyAccessJWT = (userJWT) =>{

    try {
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_ACCESS_SECRET))
        
        
    } 
    catch (error) {
        
        return(error)
    }
}
const verifyRefreshsJWT = (userJWT) =>{

    try {
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_REFRESH_SECRET))
        
        
    } catch (error) {
        
        return Promise.reject(error)
    }
}

module.exports = {createAccessJWT,createRefreshJWT,verifyAccessJWT,verifyRefreshsJWT}