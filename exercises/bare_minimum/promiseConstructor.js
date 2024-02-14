/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');
var fsp = require('node:fs/promises');

// This function should retrieve the first line of the file at `filePath`

/*
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
*/

var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  /*  Use promises*/
  return new Promise((resolve, reject) => {
    let result;
    fsp.readFile(filePath)
      .catch((err)=>{
        reject(err);
      })
      .then((data)=>{
        result = String(data).slice(0, String(data).indexOf('\n'));
        resolve(result);
      });
  }
  );

  // fsp.readFile(filePath)
  //   .catch((err)=>(err))
  //   .then((data)=>{
  //     result = String(data).slice(0, String(data).indexOf('\n'));

  //   });

};


// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  return new Promise((resolve, reject) => {
    request('get', url)
      .then((response) => {
        resolve(response.statusCode);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
