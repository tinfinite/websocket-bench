/*global module, require*/
var io       = require('socket.io-client'),
  util       = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger     = require('../logger.js'),
  queryParams = require('../../query.js');

/**
 * SocketIOWorker Worker class inherits form BaseWorker
 */
var SocketIOWorker = function (server, generator) {
  SocketIOWorker.super_.apply(this, arguments);
};

util.inherits(SocketIOWorker, BaseWorker);

SocketIOWorker.prototype.createClient = function (callback) {
  var self = this;
  var queryParam = queryParams[Math.ceil(Math.random() * Number(queryParams.length - 1))];
  var user_id = queryParam.user_id;
  var live_show_id = queryParam.live_show_id;
  var token = queryParam.token;
  var client = io.connect(this.server, { transports: ['websocket'], path: this.path , reconnection: false, 'force new connection' : true });
  client.on('connect', function () {
    callback(false, client);
  });

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
