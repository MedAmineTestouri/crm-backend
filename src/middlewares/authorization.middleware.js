
const {verifyAccessJWT}=require('../helpers/jwt.helper')
const{getJWT,deletJWT}=require('../helpers/redis.heper')
const userAuthaurization = async(req,res,next)=>{
    // console.log('headersssss',req)
    const {authorization}=req.headers
    // console.log(authorization)

    //verify jwt is valid 
    const decoded  = await verifyAccessJWT(authorization)
    

    
    //check if jwt exist in redis
    if(decoded.email){
       const userId= await getJWT(authorization)
        if(!userId){
            return res.status(403).json({message:"forbidden1"})
        }
            req.userId = userId
            return next()
    }
    deletJWT(authorization) 
    return res.status(403).json({message:"forbidden2"})
        
       
    
      
    
    
    
}
module.exports = {userAuthaurization}