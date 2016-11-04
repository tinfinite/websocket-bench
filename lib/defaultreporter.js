/*global module, require*/
var Table = require('cli-table');

/**
 * Class for display bench result
 */
var DefaultReporter = function (outputStream) {
  this.haveOut = Boolean(outputStream);
  this.outputStream = outputStream || process.stdout;

};

DefaultReporter.prototype.report = function (steps, monitor, stopwatch) {

  var tableSteps = new Table({
    head : ['Number', 'Connections', 'Errors', 'Duration(ms)']
  });

  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];

    tableSteps.push([
      step.number,
      step.monitor.results.connection,
      step.monitor.results.errors,
      step.stopwatch.getDuration()
    ]);
  }
  if (!this.haveOut) {
    this.outputStream.write('\n');
    this.outputStream.write('#### steps report ####'.inverse + '\n');
    this.outputStream.write(tableSteps.toString() + '\n');
  }

  var tableTotal = new Table({
    head : ['Number', 'Connections', 'Errors', 'Message Send', 'Message Fail', 'Duration(ms)']
  });
  var tableArray = [
    monitor.counter,
    monitor.results.connection,
    monitor.results.errors,
    monitor.results.msgSend,
    monitor.results.msgFailed,
    stopwatch.getDuration(),
  ];
  tableTotal.push(tableArray);
  var obj = {
    Number: monitor.counter,
    Connections: tableArray[1],
    Errors: tableArray[2],
    'MessagSend': tableArray[3],
    'MessageFail': tableArray[4],
    'Duration': tableArray[5]
  };
  var str = JSON.stringify(obj);
  if (this.haveOut) {
    this.outputStream.write(str + '\n');
    return;
  }
  this.outputStream.write('#### total report ####'.inverse + '\n');
  this.outputStream.write(tableTotal.toString() + '\n');
};

module.exports = DefaultReporter;
