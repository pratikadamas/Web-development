
// core module
// const http = require('http');

// express module
const express = require('express');
const app = express();

// custom module
const requestHandler = require('./module');

// adding middleware 1
app.use((req, res, next) => {
   res.setHeader('Content-Type', 'text/plain');
  console.log("Request received");
  res.send("Hello from Express!");
  // next();
});
// adding middleware 2
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  console.log('Response header set');
 
});

// const server = http.createServer(app);

const PORT = 8080;
// server.listen(PORT, () => {
//   console.log(`Server running on address http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
