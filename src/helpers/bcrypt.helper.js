const bcrypt = require('bcrypt');
const saltRounds = 10 ;

const hashPassword = plainPassword =>{
    return new Promise(resolve=>{
        resolve(bcrypt.hashSync(plainPassword,saltRounds))
    })
}
const comparePasswd = (plaintPass,PassDB) => {
    return new Promise((resolve,reject)=>{
        bcrypt.compare(plaintPass, PassDB, function(err, result) {
            if(err) reject(err);


            resolve(result)
        });
    })
}
module.exports = {hashPassword,comparePasswd}