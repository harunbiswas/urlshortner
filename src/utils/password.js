/*
** title: password 
** description: manage password and return hash
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const crypto = require('crypto');



// module scaffolding
const password = {};


// body

// get a random salt string
getRandomSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 16);
}

// mix user password and solt
mix = (password, salt) => {
    const key=  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return key
}


// genarate a hash to user password
password.generate = (password) => {
    let salt = getRandomSalt();
    let hash = mix(password, salt);
    return {salt, hash}
}

password.validate = (password, hash, salt) => {
    let newHash = mix(password, salt);
    return newHash === hash;
}


password.parseJSON = (jsonString) => {
    let output ;
    try{
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
}

// export module
module.exports = password;