var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    if(req.url === '/'){
      res.writeHead(200, httpHelpers.headers);
      res.end(archive.getIndex());
    }else{
      if(!archive.isUrlInList(req.url)){
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }else{
        res.writeHead(200, httpHelpers.headers);
        res.end(req.url);
      }
    }
  }
  if(req.method === 'POST'){
    var data = '';
    req.on('data', function(chunk){
      data = chunk;
    });
    req.on('end', function(){
      data = data.split('url=')[1] + "\n";
      
      // store in sites.txt
      archive.addUrlToList(data);

      res.writeHead(302, httpHelpers.headers);
      res.end();
    });
  }
}