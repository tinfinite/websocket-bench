/*global module, require*/

var logger = require('./logger');
// var util_sleep = require('../util/sleep');
var querys = require('../query');

module.exports = {

  /**
   * Before connection (just for faye)
   * @param {client} client connection
   */
  beforeConnect : function (client) {
    // Your logic
    // By example
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket')
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect: function (client, done) {
    // Your logic
    // client.subscribe('/test', function() {})
    done()
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    // util_sleep.sleep(10);
    client.emit('ping', { msg: 'hello world' });
    done();
  }
};
