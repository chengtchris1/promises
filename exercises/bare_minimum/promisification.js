/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');
//Promise.promisifyAll(request);

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

//Will stay as a function taking in user and callback.
var getGitHubProfileAsync = (user)=>{
  let transformed = Promise.promisify(getGitHubProfile);
  return transformed(user);
  // var url = 'https://api.github.com/users/' + user;
  // var options = {
  //   headers: { 'User-Agent': 'request' },
  // };


  // request.getAsync(url, options)
  //   .catch(/*do something*/)
  //   .then(/*do something*/);


}; // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = () => {
  let transformed = Promise.promisify(generateRandomToken);
  return transformed();
}; // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = (filePath) => {

  //let transformed = Promise.promisify(readFileAndMakeItFunny);
  //return transformed(filePath);

  let transformed = Promise.promisify(readFileAndMakeItFunny);
  return new Promise((resolve, reject) => {
    transformed(filePath)
      .catch((err)=>{ reject(err); })
      .then((funny)=>{ resolve(null, funny); })
  });


}; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
