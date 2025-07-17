let http = require('http');

const server=http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  if (req.url === '/') {

    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>Welcome to the Home Page!</h1></body>');
    res.write('<h1> enter your details</h1>');
    res.write('<form method="POST" action="/submit">');
    res.write("Name: <input type='text' name='Name'><br><br>");
    res.write("email: <input type='text' name='email'><br> <br>");
    res.write("phone number: <input type='text' name='phoneNumber'><br><br>");
    res.write('<button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</html>');
  }
  else if(req.url.toLowerCase()==='/submit' && req.method ==='POST')
  {
    res.write('<html><body><h1>Form Submitted Successfully!</h1></body></html>');
  }


  res.end();

  


});
server.listen(8080, function() {
  console.log('Server is listening on port 8080');
  console.log('You can access it at http://localhost:8080');
  console.log('Press Ctrl+C to stop the server');
});