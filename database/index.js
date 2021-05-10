const credentials = require('./credentials');
var mysql = require('mysql');
var connection = mysql.createConnection(credentials);
connection.connect();

module.exports = connection;