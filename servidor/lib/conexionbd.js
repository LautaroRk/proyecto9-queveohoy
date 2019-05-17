var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "localhost",
  port     : "3306",
  user     : "root",
  password : "mascheranork",
  database : "peliculas"
});

module.exports = connection;
