const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name:{
        type : String,
        maxlength : 50 , 
        required : true
    },
    company:{
        type : String,
        maxlength : 50 , 
        required : true
    },
    address:{
        type : String,
        maxlength : 50 , 
        required : true
    },
    phone:{
        type : String,
        maxlength : 50 , 
        required : true
    },
    email:{
        type : String,
        maxlength : 50 , 
        required : true
    },
    password:{
        type : String,
        maxlength : 100 , 
        required : true
    },
    refreshJWT:{
        token:{
            type : String,
            default :'',
            required : true
        },
        addedAt:{
            type:Date,
            required:true,
            default :Date.now()
        }
        
    }

})
module.exports = {
    UserSchema : mongoose.model('User',UserSchema)
}