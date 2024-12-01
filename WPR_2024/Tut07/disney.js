"use strict";

const express = require("express");
const app = express();
const fs = require("fs").promises;
const multer = require("multer");
// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

// define 'add' endpoint here
app.post("/add", async (req, res) => {
  let movie = req.body.movie;
  let year = parseInt(req.body.year);
  let song = req.body.song;
  let rating = parseInt(req.body.rating);
  if (movie && year && song && rating) {
    try {
      let data = await fs.readFile("movies.json", "utf8");
      data = JSON.parse(data);
      let movieExists = data[movie];
      let response = "";
      if (movieExists) {
        response = "updated information for designated movie";
        data[movie] = {
          "release-year": year,
          "featured-song": song,
          "rotten-tomatoes": rating,
        };
        await fs.writeFile("movies.json", JSON.stringify(data));
        res.send(response);
      } else {
        response = "added information for designated movie";
      }} catch (e) {
        if(e.code === 'ENOENT'){
            res.send('file does not exist')
        }else{
            res.send('something went wrong on the server')
        }}} else {
    res.status(400).send("Missing required parameters");}
});
app.listen(8000);
