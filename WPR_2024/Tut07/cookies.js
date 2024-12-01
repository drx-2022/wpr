'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Use cookie-parser to handle cookies
app.use(cookieParser());

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Route for /page1 (GET)
app.get('/page1', (req, res) => {
  const userName = req.cookies.user_name; // Get the user_name cookie

  if (userName) {
    res.send(`Welcome ${userName}`);
  } else {
    res.send(`You're not recognized.<br />
    Please register your name <a href="/page2">here</a>.`);
  }
});

// Route for /page2 (GET) - Displays the form
app.get('/page2', (req, res) => {
  res.send(`
    <form action="/page2" method="POST">
      <label for="name">Enter your name:</label>
      <input type="text" id="name" name="user_name" required />
      <button type="submit">Save</button>
    </form>
  `);
});

// Route for /page2 (POST) - Handles form submission and sets cookie
app.post('/page2', (req, res) => {
  const userName = req.body.user_name; // Get the name from the form
  if (userName) {
    // Set the user_name cookie to expire after 1 minute (60000ms)
    res.cookie('user_name', userName, { maxAge: 60000 });
    res.send(`Cookie set for ${userName}. You can go back to <a href="/page1">Page 1</a>.`);
  } else {
    res.status(400).send('Name is required');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
