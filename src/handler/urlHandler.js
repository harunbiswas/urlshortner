/*
** title: url
** description: 
** author: Harun Biswas Rubel
** Date: 08-12-2021
*/

// dependenciess

const { read, update, create } = require('../controllers/data');
const data = require('../controllers/data')
const {generate, validate, parseJSON} = require('../utils/password');
const loginHandler = require('./loginHandler')


// module scaffolding
const handler = {};


// body
handler.urlHandler = (requestProparties, callback) => {
    handler._url.get(requestProparties, callback)
}

// user scaffolding
handler._url = {};


// body 
handler._url.get = (requestProparties, callback) => {

    const pathName = requestProparties.trimmedPath.replace(/^\:+|\:+$/g, '');
    
    // read file form record
    read('record', pathName, (err, data) => {
        if(!err && data) {
            const hashData = parseJSON(data);
            const destination = hashData.destination
            callback(302, destination)
        }else {
            callback()
        }
    })
}


// export module
module.exports = handler;