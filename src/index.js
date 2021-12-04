/*
** title: Url shortener 
** description: User given a url and app provide shortened url
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const bp = require('body-parser');

const server = require('./helpers/server');



// module scaffolding
const app = {};
// body

// start the server
server.init();

// export module
module.exports = app;