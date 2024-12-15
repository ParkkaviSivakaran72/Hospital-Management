const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);
console.log(process.env.DB_DATABASE);



// Create a single MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // Replace with your database host
  user: process.env.DB_USER,     // Replace with your database user
  password: process.env.DB_PASSWORD, // Replace with your database password
  database: process.env.DB_DATABASE // Replace with your database name
});

// Export a promise-based query function
const promiseConnection = connection.promise();

module.exports = connection;  