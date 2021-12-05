/*
** title: Handle request and response 
** description: Handle all request and response related operations
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('./routes');
const {notFundHandler} = require('../handler/notFundHandler');
const { homeHandler } = require('../handler/homeHandler');
const {parseJSON} = require('../utils/password')


// module scaffolding
const handler = {}


// body
handler.handleReqRes = (req, res) => {
    // request handle
    // get url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    
    let chosenHandler = homeHandler;
    if(trimmedPath === ''){
        chosenHandler = homeHandler;
    }else{
        chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFundHandler;
    }

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);

    });


    req.on('end', () => {
        realData += decoder.end();
        requestProperties.body = parseJSON(realData)

        chosenHandler (requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

    
};



// export module
module.exports = handler;