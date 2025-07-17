const http = require('http');
const requestHandler = require('./module');

const server = http.createServer(requestHandler);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
