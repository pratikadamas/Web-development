const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const connectDB = require('./db');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('', require('./routes/routes'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
