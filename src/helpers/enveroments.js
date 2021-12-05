/*
** title: enveroments 
** description: Handle all erviroments related things
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess



// module scaffolding
const enviroments = {};


// body

// staging enverments 
enviroments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'djflkhjfrghlkjrfg98459045jsklfgjldasjf'
    
};


// production enverments 
enviroments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'fjadsjfjjjr0f09sdf0uj4j35ruu5jfgklvj9a'
    
}

// determind which enveroment was passed
const currentEnviromet = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding enviroment obdect

const enviromentToExport = typeof(enviroments[currentEnviromet]) === 'object' ? enviroments[currentEnviromet] : enviroments.staging;


// export module
module.exports = enviromentToExport;