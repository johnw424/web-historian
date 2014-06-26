var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var index = path.join(__dirname, '../web/public/index.html')
var loading = path.join(__dirname, '../web/public/loading.html')

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.getURL = function(req, res){
  if(req.url === '/'){
    res.writeHead(200, headers);
    res.end(fs.readFileSync(index));
  }else{
    if(!archive.isURLArchived(req.url)){
      res.writeHead(404, headers);
    }else{
      res.writeHead(200, headers);
    }
    res.end(req.url);
  }
}

exports.postURL = function(req, res){
  var data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    data = data.split('url=')[1];
    console.log(data);
    archive.addUrlToList(data);
    res.writeHead(302, headers);
    serveAssets(res, data);
  });
}

exports.serveAssets = serveAssets = function(res, asset) {
  if(archive.isURLArchived(asset)){
    res.end(fs.readFileSync(archive.paths.archivedSites + "/" + asset))
  }else{
    res.end(fs.readFileSync(loading));
  }

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};