const express = require('express');
const app = express();

// Task a: Show welcome message with name from query parameter
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`Welcome, ${name}!`);
});

// Task b: Show square of number from URL parameter
app.get('/square/:number', (req, res) => {
  const number = parseInt(req.params.number);
  res.send(String(number * number));
});

app.listen(8080);