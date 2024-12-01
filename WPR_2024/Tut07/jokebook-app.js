'use strict';

const express = require('express');
const app = express();

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'Why don\'t scientists trust atoms?',
    'response': 'Because they make up everything'
  },
  {
    'joke': 'What did the left eye say to the right eye?',
    'response': 'Between you and me, something smells.'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  },
  {
    'joke': 'Why did it get so hot in the baseball stadium after the game?',
    'response': 'All of the fans left.'
  }
];
app.get('/jokebook/categories', (req,res)=>{
  res.type('text')
  res.send(getCategories())
})
app.get('/jokebook/joke/:category',async (req,res) =>{
  let category = req.params['category']
  console.log(category);
  if(category === 'funnyJoke' || category === 'lameJoke'){
    res.send(getJokes(category))
  }else{
    res.status(400).json({'error': 'no category listed for ' + category});
  }
})
function getCategories(){
  let result = ''
  categories.forEach((category)=>{
    result += 'a possible category is ' + category + '\n'
  })
  return result
}
function getJokes(category) {
  let number = 0;
  if (category === 'funnyJoke') {
    number = funnyJoke.length;
    return funnyJoke[Math.floor(Math.random() * number)];
  } else {
    number = lameJoke.length;
    return lameJoke[Math.floor(Math.random() * number)];
  }
}

app.use(express.static('public'));
app.listen(8000);
