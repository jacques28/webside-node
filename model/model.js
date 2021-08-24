const mysql = require('mysql');
const dbConfig = require('../config/db.config');


const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})



connection.connect(error=>{
    if(!error)
console.log('Connection Established Successfully');
else
console.log('Connection Failed!'+ JSON.stringify(error,undefined,2));
});



module.exports = connection;