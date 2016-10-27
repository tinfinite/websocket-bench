/*global module, require*/

var logger = require('./logger');

module.exports = {

  /**
   * Before connection (just for faye)
   * @param {client} client connection
   */
  beforeConnect : function (client) {
    // Your logic
    // By example
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
    client.close();
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect : function (client, done) {
    // Your logic
    // client.subscribe('/test', function() {});
    client.emit('REPORT', { live_show_i: 'fdsfsd' }, function(data) {
      console.log('--->report data', data);
    });
    client.close();
    done();
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    logger.error('Not implement method sendMessage in generator');
    // Your logic
    done();
  }
};
