var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit :  50,
    host            :  process.env.DB_HOSTNAME,
    user            :  process.env.DB_USER,
    password        :  process.env.DB_PASSWORD,
    database        :  process.env.DB_DATABASE,
    multipleStatements: true
});

module.exports = pool;
