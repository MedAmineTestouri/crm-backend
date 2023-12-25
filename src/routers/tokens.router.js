const express = require('express')
const router = express.Router()
const {verifyRefreshsJWT,createAccessJWT} = require('../helpers/jwt.helper')
const {getUserByEmail} = require('../model/user/User.model')

router.get('/',async(req,res,next)=>{
    const {authorization} = req.headers
    //make sure the token is valid
   const decoded =await  verifyRefreshsJWT(authorization)
   
     if(decoded.email){
        //check if the jwt existed in db
        const userProf = await getUserByEmail(decoded.email)
        if(userProf._id){
            //check if the jwt existed in db
            let tokenExp = userProf.refreshJWT.addedAt
            const dbrefreshToken = userProf.refreshJWT.token
            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)
            const today = new Date();
            //check if it is nt expired
            if(dbrefreshToken != authorization && tokenExp < today){
                return  res.status(403).json({message : "forbidden : token expired!"})
            }
            const userID = userProf._id.toString()
            
            const AccessJWT = await createAccessJWT(decoded.email,userID )
            return res.json({msg: 'here is the profile matched newrefreshjwt is here:', AccessJWT})
        }
    }
    res.status(403).json({message : "invalid token"})
})

module.exports = router;