/*
** title: singup handelr
** description: singup related operation;
** author: Harun Biswas Rubel
** Date: 05-12-2021
*/

// dependenciess
const data = require('../controllers/data')
const {generate} = require('../utils/password')

// module scaffolding
const handler = {};


// body
handler.singupHandler = (requestProparties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    
    if(acceptedMethods.indexOf(requestProparties.method) > -1){
        handler._user[requestProparties.method](requestProparties, callback)
    }else(
        callback(405)
    )
}

// user scaffolding
handler._user = {};

// post requser handle
handler._user.post = (requestProparties, callback) => {
    // valided input 
    const email = typeof(requestProparties.body.email) === 'string' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestProparties.body.email) ? requestProparties.body.email : false;

    const name = typeof(requestProparties.body.name) === 'string' && requestProparties.body.name.trim().length > 0 ? requestProparties.body.name : false;

    const password = typeof(requestProparties.body.password) === 'string' && requestProparties.body.password.trim().length > 4 ? requestProparties.body.password : false;

    if(email && name && password) {
        // check: user already exists
        data.read('users', email, (err) => {
            if(err){
                const userObject = {
                    email,
                    name,
                    password: generate(password),
                }

                // create file and store db
                data.create('users', email, userObject, (err1) => {
                    if(!err1){
                        callback(200, {
                            message: 'user created successfully!'
                        })
                    }else {
                        callback(500, {
                            error: 'user not create!'
                        })
                    }
                })
            }else {
                callback(500, {
                    error: 'user already exists!'
                })
            }
        })
    }else {
        callback(400, {
            error: 'There was a problem in your request!'
        })
    }
    
}

// export module
module.exports = handler;