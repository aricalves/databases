const db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.query('select * from messages;', (error, results, fields) => {
        if (error) { throw error; }
        console.log(results, fields);
      });
      connection.end();
      
    }, // a function which produces all the messages
    post: function () {
      db.query('insert into chats ____ ', (err, response) => {
        console.log('post success:', response);
      });
    } // a function which can be used to insert a message into the database
    
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

