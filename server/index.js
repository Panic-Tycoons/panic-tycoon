var http = require('http');
var fs = require('fs');
var path = require('path');
var config = require ('./config-loader.js');
var browserify = require('browserify');
var b = browserify(config.APP_DIR + "js/index.js");
var url  = require('url');


http.createServer(function (req,res) {
    if (req.url === "/config") {
        res.writeHead(200);
        res.end("PANIC TYCOON CONFIG\n===================\n\n" + JSON.stringify(config));
        return;
    } else if (req.url.toLowerCase() === "/js/bundle.js") {
        res.writeHead(200);
        b.bundle().pipe(res);
    } else if (req.url.toLowerCase().indexOf("/assets/") >= 0) {
        res.writeHead(200);
        res.end(fs.readFileSync(path.normalize(config.APP_DIR + url.parse(req.url).pathname)));
    } else {
        res.writeHead(200);
        res.end(fs.readFileSync(path.normalize(config.APP_DIR + "index.html")));
        return;
    }
}).listen(config.port || 8080, function() {
    var port = config.port || 8080;
    console.log("Server now running on port %s (i.e. http://localhost:%s)", port, port);
    console.log("CTRL + C to shut down");
});
