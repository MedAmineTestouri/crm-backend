
const express = require('express')
const router = express.Router()
const {insertUser,getUserByEmail} = require('../model/user/User.model')

const {hashPassword,comparePasswd} = require('../helpers/bcrypt.helper')
const {createRefreshJWT,createAccessJWT}=require('../helpers/jwt.helper')


router.all('/',(req,res,next)=>{
    // res.json({message : "return from user router"})
    next() //this function basically what it does is that its continues to the next route 
})
// create new user route
router.post("/",async(req,res)=>{
    const {name,company,address,phone,email,password} =req.body
    
    try {
        //hash password
        const hashPass = await hashPassword(password)

        const newUserObject = {name,company,address,phone,email,password:hashPass}

        const  result = await insertUser(newUserObject)
        console.log("data recieved",result)
        res.json({message : "new user created",result})
    } 
    catch (error) {
        res.json({message : "something went wrong",error})
        console.log("error recieved",error)
    }
    
    
})

// User Sign in Router
router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if (!email || !password){
        res.json({status:'error',message:"invalid form submission"})
    }

    //get user with password from database
    const user = await getUserByEmail(email)
    console.log(user)
    const passfromDB = user && user._id ? user.password : null
    if(!passfromDB) return res.json({status:'error',message:"invalid email or password"})

    


    const result = await comparePasswd(password,passfromDB)
    
    

   

    if(!result) {
        res.json({status:'error',message:"invalid form submission"})
    }
    const accessJWT = await createAccessJWT(user.email,`${user._id}`)
    const refreshJWT = await createRefreshJWT(user.email,`${user._id}`)
    res.json({status:"success",message : "login successfuy",access:accessJWT,refresh:refreshJWT})
})

module.exports = router;    