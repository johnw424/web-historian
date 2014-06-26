var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var util = require('util');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
};

exports.getIndex = function(){
  return fs.readFileSync(exports.paths.index);
}


// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  var storage = [];
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    var chunk = data.split('\n');
    _.each(chunk, function(item){
      storage.push(item);
    })
  });
  cb(storage);
};

exports.isUrlInList = function(url){
  var result = false;
  exports.readListOfUrls(function(storage){
    _.each(storage, function(item){
      if(item === url){
        result = true;
      }
    })
  });
  return result;
};

exports.addUrlToList = function(url){
  if(!exports.isUrlInList(url)){
    fs.appendFile(exports.paths.list, url, function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }
};

exports.isURLArchived = function(url){
  return fs.existsSync(exports.paths.archivedSites+"/"+url);
};

exports.downloadUrls = function(){
};
