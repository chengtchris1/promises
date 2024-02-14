/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var rl = require('readline');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`

var pluckFirstLineFromFile = function (filePath, callback) {

  // TODO
  fs.open(filePath, (err, fd)=>{
    if (err) {
      callback(err);
      return;
    } else {
      var lines = [];
      const stream = fs.createReadStream(filePath);
      const read = rl.createInterface(stream);
      read.on('line', (line)=>{
        lines.push(line);
        read.close();
        //console.log(lines);
      });
      read.on('close', ()=>{
        console.log(lines);
        callback(null, lines[0]);
      });

    }

  });

};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url) {
  // TODO
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
