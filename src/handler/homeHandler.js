/*
** title: homehandler
** description: 
** author: Harun Biswas Rubel
** Date: 05-12-2021
*/

// dependenciess



// module scaffolding
const handler = {};


// body
handler.homeHandler = (requestProparties, callback) => {
    console.log(requestProparties);
    callback(200, {
        message: "This is a home page",
    })
}



// export module
module.exports = handler;