
const redis = require('redis');
const client =  redis.createClient();
client.on('error', (err) => console.log(err));
// client.connect();


//  (default it has to be changed in .env if its in production phase)
const setJWT= async(key,value)=>{
    
    

    
    return new Promise((resolve,reject)=>{

        console.log("test ressssss in get method", key, value)
        try {

            client.set(key,value,(err,res)=>{
                if(err) {
                    reject(err)
                    
                    console.log("res",res)
                }
                resolve(res) 
                console.log("err",err)

                
            })
            
            resolve(key,value)
        } 
        catch (error) {
            reject(error)
            console.log("error",error)
        }
    
    })
    
}
const getJWT= (key)=>{
    return new Promise((resolve,reject)=>{
        try {
            client.get(key,(err,res)=>{
                if(err) {reject(err)}
                resolve(res)
            })
        } 
        catch (err) {
            reject(err)
        }
    
    })
    
}
module.exports ={
    setJWT,
    getJWT
}