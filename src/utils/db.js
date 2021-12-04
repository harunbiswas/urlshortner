/*
** title: data base
** description: all database related oparations 
** author: Harun Biswas Rubel
** Date: 04-12-2021
*/

// dependenciess
const Sequelize = require('sequelize');
const enviroments = require('../helpers/enveroments')



// module scaffolding
const database = {}


// body

const CONNECTION_STRING = enviroments.DATABASE || 'postgres://postgress:secret@localhost:5432/urls';
database.db = new Sequelize(CONNECTION_STRING);

database.Users = db.define('users', {
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,

})
database.Direction = db.define('derection', {
    destination: Sequelize.TEXT,
    hash:Sequelize.TEXT,

})




// export module
module.exports = database;