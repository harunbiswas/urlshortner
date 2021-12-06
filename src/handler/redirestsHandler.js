/*
** title: Redirests
** description: 
** author: Harun Biswas Rubel
** Date: 06-12-2021
*/

// dependenciess

const { read, update } = require('../controllers/data');
const data = require('../controllers/data')
const {generate, validate, parseJSON} = require('../utils/password');
const loginHandler = require('./loginHandler')


// module scaffolding
const handler = {};


// body
handler.redirestsHandler = (requestProparties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    
    if(acceptedMethods.indexOf(requestProparties.method) > -1){
        handler._redirests[requestProparties.method](requestProparties, callback)
    }else(
        callback(405)
    )
}

// user scaffolding
handler._redirests = {};

// post recorts
handler._redirests.post = (requestProparties, callback) => {
    // valided input 
    const url = typeof(requestProparties.body.url) === 'string' ? requestProparties.body.url : false;

    if(url){
       const token = typeof(requestProparties.headersObject.token) === 'string' ? requestProparties.headersObject.token : false
       if(token){
          
           data.read('tokens', token, (err, data) => {
               if(!err, data){
                    const tokenData = { ...parseJSON(data)};
                    const userEmail = tokenData.email;

                    loginHandler._token.verify(token, userEmail, (tokenValid) => {
                        if(tokenValid) {
                            //look up the user
                            read('users', userEmail, (err1, data1) =>{
                                if(!err1 && data1){
                                    const userData = parseJSON(data1);
                                    const id = userData._id;
                                    const destination = url;
                                    const timestamp = Date.now()/1000;
                                    const hash = parseInt(`${timestamp}`).toString(32);
                                    const hashObject = {
                                        destination,
                                        hash,
                                    }
                                    if(!userData.record){
                                        userData.record = [];
                                    }
                                    userData.record.push(hashObject)
                                    console.log(userData.record)
                                    update('users', userEmail, userData, (err2) => {
                                        if(!err2){
                                            callback(200, {
                                                message: 'record store successfully!'
                                            })
                                        }else {
                                            callback(500, {
                                                error: 'redord not store'
                                            })
                                        }
                                    })
                                }else {
                                    callback(500, {
                                        error: 'user not found!'
                                    })
                                }

                            })
                        }else {
                            callback(403, {
                                error: 'unAuthenticated'
                            })
                        }
                    })

               }else {
                   callback(500, {
                       errror: 'There was a problem read token!'
                   })
               }
           })
       }else {
           callback(400, {
               error: "not found token"
           })
       }
    }else {
        callback(400, {
            error: 'There was a problem in your request!'
        })
    }
    
}

handler._redirests.get = (requestProparties, callback) => {
    const email = typeof(requestProparties.queryStringObject.email) === 'string' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestProparties.queryStringObject.email) ? requestProparties.queryStringObject.email : false;

    const token = typeof(requestProparties.headersObject.token) === 'string' ? requestProparties.headersObject.token : false
    console.log(token)
    if(email && token){
        loginHandler._token.verify(token, email, (validate) => {
            if(validate) {
                read('users', email, (err, data) => {
                    if(!err && data) {
                        userData = parseJSON(data).record;
                        callback(200, userData)
                    }else {
                        callback(500, {
                            error: 'user not found!'
                        })
                    }
                })
            }else {
                callback(400, {
                    error: "unauthoraise"
                })
            }
        })
    }else {
        callback(400, {
            Error : "There was a problem in your request!"
        })
    }
}


// export module
module.exports = handler;