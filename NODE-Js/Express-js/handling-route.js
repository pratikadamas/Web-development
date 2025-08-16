const express = require('express');
const app = express();
const port = 8080;


//based on path
// app.use("/",(req, res, next) => {
//   console.log('1.Middleware: This always runs');
//     // res.setHeader('Content-Type', 'text/plain');
//   // res.send("Hello from Express!");
//   next();
  
// });

// app.use("/submit",(req, res, next) => {
//   console.log('2.Middleware: This also always runs');
//     res.setHeader('Content-Type', 'text/plain');
//     res.send("Data submitted successfully!");

//   });

// Define a route for GET requests to the root URL



// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});