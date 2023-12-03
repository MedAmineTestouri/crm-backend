
const express = require('express')
const router = express.Router()
const insertUser = require('../model/user/User.model')
const hashPassword = require('../helpers/bcrypt.helper')


router.all('/',(req,res,next)=>{
    // res.json({message : "return from user router"})
    next() //this function basically what it does is that its continues to the next route 
})
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

module.exports = router;