var mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat'
});

dbConnection.connect((err) => {
  if (err) { 
    throw err;
  }
  console.log('Database connected.');
});

module.exports = dbConnection;
