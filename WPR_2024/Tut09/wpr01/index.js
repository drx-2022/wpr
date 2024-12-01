const express = require("express");
const app = express();
const mysql = require("mysql2");

// create mysql2 asynchronous connection
const conn = mysql.createConnection({
    user: 'root',
    database: 'wpr'
}).promise();

// serve static files on public folder?
app.use(express.static('public'));

app.get("/games/genres", async (req, res) => {
    try {
        let [rows] = await conn.query("SELECT * FROM genres ORDER BY genre_name ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).send("Something's wrong on endpoint 1.");
    }
});

app.get("/games/list/:genreid/:year", async (req, res) => {
    let genreid = req.params.genreid;
    let year = req.params.year;
    console.log(genreid);
    console.log(year);
    try {
        let sql = "SELECT id, name, platform, publisher FROM games WHERE genre = ? AND release_year = ? LIMIT 10";
        let [rows] = await conn.query(sql, [genreid, year]);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.status(500).send("Something's wrong on endpoint 2.");
    }
});



app.listen(8000);