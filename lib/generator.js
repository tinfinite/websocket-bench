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
    // client.disable('websocket')
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect: function (client, done) {
    // Your logic
    // client.subscribe('/test', function() {});
    client.on('GETSYSTEMMESSAGE', function(data) {
    });
    client.on('PULLMESSAGE', function(data) {
      console.log('push data', data);
    })
    done()
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    var message = {
      liveshowId: 'ceshi',
      fromUserName: 'test',
      fromUserImgUrl: 'sf',
      content: 'fsdfsdfdsafsfds'
    }
    // console.log('send')
    client.emit('SENDSYSTEMMESSAGE', message);
    done();
  }
};
