var models = require('../models');

module.exports = {
  
  messages: {
    
    
    
    
    get: function (req, res) {
      console.log('controller get');
      models.messages.get(data => {
        res.end(data);
      });
    },
    
    
    
    // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('controller post');
      models.messages.post(req.body, () => {
        res.end();
      });
    } // a function which handles posting a message to the database
  }

  // users: {
  //   // Ditto as above
  //   get: function (req, res) {},
  //   post: function (req, res) {}
  // }
};

