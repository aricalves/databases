const db = require('../db');

module.exports = {
  messages: {
    get: function (queryString) {
      connection.query(queryString, function (error, results, fields) {
        if (error) { throw error; }
        console.log('The solution is: ', results[0].solution);
      });

      connection.end();
      
    }, // a function which produces all the messages
    post: function () {
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

