/*
** title: sample handler
** description: 
** author: Harun Biswas Rubel
** Date: 05-12-2021
*/

// dependenciess



// module scaffolding
const handler = {};


// body
handler.sampleHandler = (requestProparties, callback) => {
    console.log(requestProparties);
    callback(200, {
        message: "This is a sample handler",
    })
}



// export module
module.exports = handler;