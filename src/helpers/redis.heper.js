const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);


//  (default it has to be changed in .env if its in production phase)
const setJWT= (key,value)=>{

return new Promise((resolve,reject)=>{

        
        try {

            client.set ((key,value),(res,err)=>{
                if(res) resolve(res)
                reject(err)
            })
            resolve(key,value)
        } 
        catch (error) {
            reject(error)
        }
    
    })
    
}
const getJWT= (key)=>{
    return new Promise((resolve,reject)=>{
        try {
            client.get ("key"),(err,res)=>{
                if(err) {reject(err)}
                resolve(res)
            }
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