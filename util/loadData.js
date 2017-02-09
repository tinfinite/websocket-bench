var fs = require('fs');
var path = require('path');
var readline = require('readline');
var result = [];

module.exports = function (filePath) {
  try {
    return new Promise((resolve) => {
      var rl = readline.createInterface({
        input: fs.createReadStream(filePath)
      });
      rl.on('line', (line) => {
        line = JSON.parse(line);
        result.push({
          token: line.token
        });
      })
      rl.on('close', () => {
        var filename = path.join(__dirname, '../query.js');
        var text = `var params = ${JSON.stringify(result)};`;
        text += '\n';
        text += 'module.exports = params;';
        if (fs.existsSync(filename)) fs.unlinkSync(filename);
        fs.writeFileSync(filename, text);
        return resolve(true);
      })
    });
  } catch (e) {
    throw e;
    process.exit(0);
  }
}
