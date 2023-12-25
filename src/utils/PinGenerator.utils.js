const PinGenerator = (length)=>{

    let pin = ""
    for (let i = 0; i < length; i++) {
        pin = pin + Math.floor(Math.random()*10)
        
    }
    // pin = JSON.parse(JSON.stringify({ "pin": pin}))
    return pin
     

}
module.exports  ={PinGenerator}