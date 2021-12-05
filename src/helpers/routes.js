/*
** title: routers
** description: router related operations
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const {sampleHandler} = require('../handler/sampleHandler');
const {singupHandler} = require('../handler/singupHandler');
const {loginHandler} = require('../handler/loginHandler');


// module scaffolding



// body
const routes = {
    sample: sampleHandler,
    singup: singupHandler,
    login: loginHandler,
}


// export module
module.exports = routes