var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({
	proxyTimeout: 40000
});

proxy.on('error', function (err, req, res) {
	res.writeHead(500, {
    	'Content-Type': 'text/plain'
  	});

  	res.end('Device is offline');
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://192.168.8.100:80' });
});

//console.log("listening on port 5050")
server.listen(5050);