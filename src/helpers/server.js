/*
** title: create server 
** description: create a http server 
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const http = require('http');

const enviroments = require('./enveroments')
const {handleReqRes} = require('./handelReqRes')


// module scaffolding
const server = {}


// body
server.init= () => {
    server.serverCreate = () => {
        const server = http.createServer(handleReqRes)

        server.listen(enviroments.port, () => {
            console.log(`listening to port ${enviroments.port || 4000}`)
        })
    }
    server.serverCreate()
}

// export module
module.exports = server;
