var mysql = require('mysql');

exports.dbConnection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat'
});

exports.dbConnection.connect((err) => {
  if (err) { throw err; }
  console.log('Success! Database connected.');
});
