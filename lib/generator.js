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
    // client.subscribe('/test', function() {});
    // client.on('GETSYSTEMMESSAGE', function(data) {
    // });
    // client.on('PULLMESSAGE', function(data) {
    //   // console.log('push data', data);
    // })
    done()
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    // util_sleep.sleep(10);
    // var query = querys[Math.ceil(Math.random() * Number(querys.length - 1))];
    // var message = {
    //   liveshowId: query.live_show_id,
    //   fromUserName: 'bench-test',
    //   fromUserImgUrl: 'http://img5.imgtn.bdimg.com/it/u=2689299301,1737492272&fm=21&gp=0.jpg',
    //   content: 'bench-test'
    // }
    // console.log('send')
    client.emit('message', 'hello', function(data) {
      console.log(data);
    });
    done();
  }
};
