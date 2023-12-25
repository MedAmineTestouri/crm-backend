const {ResetPinSchema} = require('./ResetPin.schema')
const {PinGenerator} = require('../../utils/PinGenerator.utils')

const insertPin = async(email) => {
    const pinLength = 6
    const pin = await PinGenerator(pinLength)
    const obj = {"pin":pin,"email":email}
    return new Promise((resolve , reject)=>{
        ResetPinSchema(obj)
            .save()
            .then((data) => resolve(data))
            .catch((error)=> reject(error))
        }
    )
    
}


module.exports = {insertPin}