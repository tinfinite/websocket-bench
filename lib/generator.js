/*global module, require*/

var logger = require('./logger');

module.exports = {

  /**
   * Before connection (just for faye)
   * @param {client} client connection
   */
  beforeConnect: function (client) {
    // Your logic
    // By example
    // doSometing
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect: function (client, done) {
    done()
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage: function (client, done) {
    client.emit('ACKPULLMESSAGE', { limit: 70, start: 0}, function(err, data) {
      //console.log(err, data);
    });
    done();
  }
}
;
