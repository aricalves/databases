const db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT text FROM messages', (error, body, res) => {
        if (error) { throw error; }
        callback('great success', res);
      });
      
    }, // a function which produces all the messages
    post: function ({username, message, roomname}, callback) {
      let queryString = 'insert into messages (user, roomname, text) values (?, ?, ?)';
      let queryArgs = [username, roomname, message];
      db.query(queryString, queryArgs, (err, response) => {
        console.log('post success');
        callback();
      });
    } // a function which can be used to insert a message into the database
  }

};

