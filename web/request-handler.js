var path = require('path');
var url = require('url');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

var urlRouter = {
  "GET" : httpHelpers.getURL,
  "POST": httpHelpers.postURL,
};

exports.handleRequest = function (req, res) {
  var path = url.parse(req.url).pathname;
  var method = req.method;

  urlRouter[method](req, res);
};