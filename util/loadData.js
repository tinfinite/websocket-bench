var fs = require('fs');
var path = require('path');
var readline = require('readline');
var result = [];

module.exports = function (filePath) {
  var rl = readline.createInterface({
    input: fs.createReadStream(filePath)
  });
  try {
    rl.on('line', (line) => {
      line = JSON.parse(line);
      result.push({
        user_id: line.userId.$oid,
        live_show_id: line.liveshowId.$oid,
        token: line.token
      });
    })
    rl.on('close', () => {
      var filename = path.join(__dirname, '../query.js');
      var text = `var params = ${JSON.stringify(result)};`;
      text += '\n';
      text += 'module.exports = params;';
      fs.unlinkSync(filename);
      fs.writeFileSync(filename, text);
    })
  } catch (e) {
    throw e;
    process.exit(0);
  }
}
