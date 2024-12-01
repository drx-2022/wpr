const express = require('express');
const mysql = require('mysql2');

// (1) Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
}).promise();

const app = express();

app.get('/getgame/:id', async (req, res) => {
  try {
    // (2) Retrieve game by id
    const [rows] = await connection.query(
      'SELECT id, name, release_year FROM games WHERE id = ?',
      [req.params.id]
    );
    
    // (3) Send JSON response
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(8080);