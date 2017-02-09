# websocket bench [![Build Status](https://travis-ci.org/M6Web/websocket-bench.png?branch=master)](https://travis-ci.org/M6Web/websocket-bench)


Nodejs cli tool for benchmarking websocket servers. Currently supports:
* [Socket.IO](https://github.com/LearnBoost/socket.io)
* [Engine.IO](https://github.com/LearnBoost/engine.io)
* [Faye](https://github.com/faye/faye)
* [Primus](https://github.com/primus/primus)
* [WAMP](https://github.com/tavendo/AutobahnJS)

## Installation

   `npm install -g websocket-bench`

## Running Tests/Linting

  First Install required dev-dependencies `npm install`
  Run Gulp Build Tool `gulp mocha`

## Usage

Tip: You may find it useful to increase the maximum number of open file descriptors on your system during testing:

`ulimit -n 60000`

Simple example (using Socket.IO by default):

`websocket-bench -a 2500 -c 200 http://localhost:3000`

Simple example (using Primus):

`websocket-bench -t primus ws://localhost:8080`

command help

    Usage: websocket-bench [options] <server>

    Options:

      -h, --help               Output usage information
      -V, --version            Output the version number
      -a, --amount             Total number of persistent connection, Default to 100', parseInt)
      -c, --concurency         Concurent connection per second, Default to 20', parseInt)
      -w, --worker             number of worker', parseInt)
      -g, --generator          js file for generate message or special event)
      -J, --JsonData           Optional json file for init test data)
      -m, --message            number of message for a client. Default to 0', parseInt)
      -q, --query              request query default user_id=&token=)
      -P, --path               socket path default /sokcet.io)
      -o, --output             Output file)
      -t, --type               type of websocket server to bench(socket.io, engine.io, faye, primus, wamp). Default to io)
      -p, --transport          type of transport to websocket(engine.io, websockets, browserchannel, sockjs, socket.io). Default to websockets)
      -k, --keep-alive         Keep alive connection)
      -v, --verbose            Verbose Logging)


## Benchmark message

For benchmark message or more advanced connection you should provide your own `generator`

generator structure :

```javascript

    module.exports = {
       /**
        * Before connection (optional, just for faye)
        * @param {client} client connection
        */
       beforeConnect : function(client) {
         // Example:
         // client.setHeader('Authorization', 'OAuth abcd-1234');
         // client.disable('websocket');
       },

       /**
        * On client connection (required)
        * @param {client} client connection
        * @param {done} callback function(err) {}
        */
       onConnect : function(client, done) {
         // Faye client
         // client.subscribe('/channel', function(message) { });

         // Socket.io client
         // client.emit('test', { hello: 'world' });

         // Primus client
         // client.write('Sailing the seas of cheese');

         // WAMP session
         // client.subscribe('com.myapp.hello').then(function(args) { });

         done();
       },

       /**
        * Send a message (required)
        * @param {client} client connection
        * @param {done} callback function(err) {}
        */
       sendMessage : function(client, done) {
         // Example:
         // client.emit('test', { hello: 'world' });
         // client.publish('/test', { hello: 'world' });
         // client.call('com.myapp.add2', [2, 3]).then(function (res) { });
         done();
       }
    };

```

## example

websocket-bench -a 1 -c 1 http://127.0.0.1:9090 -v -P /live/socket.io -m 1

## See also

French article about websocket-bench : [Benchmarking websockets avec Node.Js](http://tech.m6web.fr/benchmarking-websockets-avec-nodejs)
