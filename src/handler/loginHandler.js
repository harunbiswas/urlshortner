/*
** title: login handelr
** description: login related operation;
** author: Harun Biswas Rubel
** Date: 06-12-2021
*/

// dependenciess
const data = require('../controllers/data')
const {generate, validate, parseJSON} = require('../utils/password');
const jwt = require('jsonwebtoken');
const environments = require('../helpers/enveroments')

// module scaffolding
const handler = {};


// body
handler.loginHandler = (requestProparties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    
    if(acceptedMethods.indexOf(requestProparties.method) > -1){
        handler._token[requestProparties.method](requestProparties, callback)
    }else(
        callback(405)
    )
}

// user scaffolding
handler._token = {};

// login
handler._token.post = (requestProparties, callback) => {
    // valided input 
    const email = typeof(requestProparties.body.email) === 'string' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestProparties.body.email) ? requestProparties.body.email : false;

    const password = typeof(requestProparties.body.password) === 'string' && requestProparties.body.password.trim().length > 4 ? requestProparties.body.password : false;

    if(email && password) {
        // check: find user!
        data.read('users', email, (err, userData) => {
            if(!err && userData ){
                const parseUserData = parseJSON(userData);
                const hash = parseUserData.password.hash;
                const salt = parseUserData.password.salt;
                const name = parseUserData.name;
                const email = parseUserData.email;
                
                // validate password
                const validator = validate(password, hash, salt);

                if(validator){
                    const id = jwt.sign({name,email}, environments.secretKey)
                    const tokenObject = {
                        name,
                        id,
                        email,
                    }
                    // store the token
                    data.create('tokens', id, tokenObject, (err1) => {
                        if(!err1) {
                            callback(200, tokenObject)
                        }else {
                            callback(500, {
                                error: "token not upload!"
                            })
                        }
                    })


                }else{
                    callback(400, {
                        error: "password incorrect!"
                    })
                }

            }else {
                callback(500, {
                    error: 'user not found!'
                })
            }
        })
    }else {
        callback(400, {
            error: 'There was a problem in your request!'
        })
    }
    
}

// get token
handler._token.get = (requestProparties, callback) => {
    const id = typeof(requestProparties.queryStringObject.id) === 'string' && requestProparties.queryStringObject.id.trim().length > 0 ? requestProparties.queryStringObject.id : false;

    if(id){
        // lookup the user
        data.read('tokens', id, (err, tokenData) => {
            if(!err && tokenData){
                const token = { ...parseJSON(tokenData)};
                callback(200, token)
            }else {
                callback(500, {
                    error: 'token not found!'
                })
            }
        })
    }else {
        callback(400, {
            error: "There was a problem in your request!"
        })
    }
}

//logout
handler._token.delete = (requestProparties, callback) => {
    const id = typeof(requestProparties.queryStringObject.id) === 'string' && requestProparties.queryStringObject.id.trim().length > 0 ? requestProparties.queryStringObject.id : false;
     
    if(id){
        // lookup the login
        data.read('tokens', id, (err, tokenData) => {
            if(!err && tokenData){
                // logout the user
                data.delete('tokens', id, (err1) => {
                    if(!err1){
                        callback(200, {
                            message: 'user logout successfully!'
                        })
                    }else{
                        callback(500, {
                            error: 'user could not logout!'
                        })
                    }
                })
            }else {
                callback(500, {
                    error: 'token not found!'
                })
            }
        })
    }else {
        callback(400, {
            error: 'There was a problem in your request!'
        })
    }
}


handler._token.verify = (id, email, callback) => {
    // lookup the token
    data.read('tokens', id, (err, tokenData) => {
        if(!err && tokenData){
            if(parseJSON(tokenData).email === email){
                callback(true)
            }else{
                callback(false)
            }
        }else {
            callback(false)
        }
    })
}


// export module
module.exports = handler;