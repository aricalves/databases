const db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT message FROM messages', (error, res, body) => {
        if (error) {
          console.log('DB Error ¯\\_(ツ)_/¯', error);
          callback(error, null, null);
        } else {
          callback(null, res, body);
        }
      });
      
    }, // a function which produces all the messages
    post: function ({username, message, roomname}, callback) {
      let queryString = 'insert into messages (username, roomname, message) values (?, ?, ?)';
      let queryArgs = [username, roomname, message];
      db.query(queryString, queryArgs, (err, response) => {
        console.log('DB post successful');
        callback();
      });
    } // a function which can be used to insert a message into the database
  }

};

