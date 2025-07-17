let http = require('http');

const server=http.createServer(function (req, res) {

console.log( req.url,req.method, req.headers); // request deatails

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, World! hey I am pratik giri\n');

});
server.listen(8080, function() {
  console.log('Server is listening on port 8080');
  console.log('You can access it at http://localhost:8080');
  console.log('Press Ctrl+C to stop the server');
});