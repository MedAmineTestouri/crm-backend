
const express = require('express')
const router = express.Router()
const {insertUser,getUserByEmail,getuserByid} = require('../model/user/User.model')
const {insertPin} = require('../model/resetPin/ResetPin.model')

const {hashPassword,comparePasswd} = require('../helpers/bcrypt.helper')
const {createRefreshJWT,createAccessJWT}=require('../helpers/jwt.helper')
const {userAuthaurization} = require('../middlewares/authorization.middleware')


router.all('/',(req,res,next)=>{
    // res.json({message : "return from user router"})
    next() //this function basically what it does is that its continues to the next route 
})

router.get('/',userAuthaurization,async(req,res)=>{
    const _id = req.userId
    const userProf = await getuserByid(_id)

    //extract userid
    //get user profie based on the user id
    if(userProf){res.json({userProf})};
//    return res.status(403).json({message:"forbidden wrong token pls try again"})
    
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

//A. create and send password reset pin number
//1. recieve email
//2.check if user exist for the email 
//3.create unique 6digit pin
//4.sav pin and email in db
//5.email the pin

//B. update password in DB
//1.receive email , pin and  new password
//2.validate pin
//3.encrypt new password 
//4.update password in db
//5.send email notification

//C.Server side form validation
//1.create middleware to validate form data
router.post('/reset-password',async(req,res)=>{
    const {email} = req.body
    const user = await getUserByEmail(email)
    if(user && user._id){
       const newPin = await insertPin(email)
       return res.json(newPin)
    }
    res.json({msg:"wrng informations please try again"});
})



module.exports = router;    