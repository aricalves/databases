var models = require('../models');

module.exports = {
  
  messages: {
    get: function (req, res) {
      models.messages.get((err, result, data) => {
        res.end(JSON.stringify(result));
      });
    },
    // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body);
      models.messages.post(req.body, () => {
        res.end();
      });
    } // a function which handles posting a message to the database
  }
};

