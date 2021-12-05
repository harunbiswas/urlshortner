/*
** title: not found handler
** description: not found handler
** author: Harun Biswas Rubel
** Date: 05-12-2021
*/

// dependenciess



// module scaffolding
const handler = {};


// body
handler.notFundHandler = (requestProperties, callback) => {
    callback(404, {
        message: '404(not found the page)'
    })
}



// export module
module.exports = handler;