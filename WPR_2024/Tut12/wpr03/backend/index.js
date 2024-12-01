const express = require('express');
const app = express();

const dict = {
    "pretty": "xinh đẹp",
    "car": "xe hơi",
    "study": "học tập",
    "life": "cuộc sống",
    "enormous": "to lớn",
    "computer": "máy tính"
};

const words = Object.keys(dict);
const meanings = Object.values(dict);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/wordcount', (req, res) => {
    res.json({
        wordcount: words.length
    });
});

app.get('/getword/:index', (req, res) => {
    const i = parseInt(req.params.index);
    res.json({
        index: i,
        word: words[i],
        def: meanings[i]
    });
});

app.listen(8000);