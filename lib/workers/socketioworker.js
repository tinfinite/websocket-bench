/*global module, require*/
var io       = require('socket.io-client'),
  util       = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger     = require('../logger.js');

/**
 * SocketIOWorker Worker class inherits form BaseWorker
 */
var SocketIOWorker = function (server, generator) {
  SocketIOWorker.super_.apply(this, arguments);
};

util.inherits(SocketIOWorker, BaseWorker);

SocketIOWorker.prototype.createClient = function (callback) {
  var self = this;
  var client = io(this.server, { transports: ['websocket'], path: this.path, query: this.query }).connect()
  // console.log('--->', client);

  client.on('connect', function () {
    callback(false, client);
  });
  client.on('disconnect', function() {
    logger.info('disconnect success')
  })

  client.on('connect_error', function (err) {
    if (self.verbose) {
      logger.error("SocketIO Worker connect_failed" + JSON.stringify(err));
    }
    callback(true, client);
  });

  client.on('error', function (err) {
    if (self.verbose) {
      logger.error("SocketIO Worker error: " + JSON.stringify(err));
    }
    callback(true, client);
  });
};

module.exports = SocketIOWorker;
