const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password:`${process.env.VAR}`,
  database: 'glosor'
})

const saltRounds = 10;

app.post('/signup', (req, res) => {
const username = req.body.username;
const password = req.body.password;
bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if(err) {
    res.status(418).send('Couldn´t hash password...')
  }else{
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err, result) => {
      if(err) {
       res.status(418).send('Couldn´t register user...')
      }
      else {
        res.send({username: username})
      }
    })
  }
})
})

app.post('/signin', (req, res) => {
const username = req.body.username;
const password = req.body.password;

db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
  if(err) {
    res.status(418).send(err.message)
  }else if(result.length < 1){
res.status(418).send('Username doesn`t match')
  }else{
    bcrypt.compare(password, result[0].password, (err, match) => {
      if(match){
        res.send({username})
      }if(!match){
        res.status(418).send('Password doesn`t match')
      }
    })
  }
})
})

app.post('/postQuestionCard', (req, res) => {
  const author = req.body.card.author;
  const theme = req.body.card.theme;
  const name = req.body.card.name;
 
      db.query("INSERT INTO questionsubject (author, theme, name) VALUES (?, ?, ?)", [author, theme, name], (err, result) => {
        if(err) {
         res.status(418).send('Couldn´t post card...')
        }
        else {
          res.send({author: author, theme: theme, name: name})
        }
      })
    }
);

app.post('/postQuestion', (req, res) => {
  const question = req.body.question.question;
  const answer = req.body.question.answer;
  const wrong1 = req.body.question.wrong1;
  const wrong2 = req.body.question.wrong2;
  const wrong3 = req.body.question.wrong3;
  const name = req.body.question.name;
  const answers = req.body.question.answers;
      db.query("INSERT INTO questions (question, answer, wrong1, wrong2, wrong3, name, answers) VALUES (?, ?, ?, ?, ?, ?, ?)", [question, answer, wrong1, wrong2, wrong3, name, answers ], (err, result) => {
        if(err) {
         res.status(418).send('Couldn´t post question...')
        }
        else {
          res.send({question: question, answer: answer, wrong1: wrong1, wrong2: wrong2, wrong3: wrong3, name: name, answers: answers})
        }
      })
    }
);

app.post('/postResult', (req, res) => {
  const user = req.body.result.user;
  const theme = req.body.result.theme;
  const card = req.body.result.card;
  const result = req.body.result.result;
  const max = req.body.result.max;
 
      db.query("INSERT INTO savedresults (user, theme, card, result, max) VALUES (?, ?, ?, ?, ?)", [user, theme, card, result, max], (err, results) => {
        if(err) {
         res.status(418).send('Couldn´t post result...')
         console.log(req.body)
        }
        else {
          res.send({user: user, theme: theme, card: card, result: result, max: max})
        }
      })
    }
);

app.get('/results/:user', (req, res) => {
  const user = req.params.user;
  db.query("SELECT * FROM savedresults WHERE savedresults.user = ?", [user], (err, result) => {
    if(err) {
      res.status(418).send('An error occourd')
    }
    if(res){

      res.json(result);
    }
  })
})

app.delete('/deleteResults/:id', (req, res) => {
  const resultId = req.params.id;
  db.query("DELETE savedresults FROM glosor.savedresults WHERE resultId = ?", [resultId], (err, result) => {
    console.log(req.params.id)
    if(err) {
      res.status(418).send('An error occourd')
    }
    else{
      res.send({resultId: resultId})
    }
  })
})

app.get('/themeQuestions/:theme', (req, res) => {
  const theme = req.params.theme;
  db.query("SELECT * FROM questionsubject WHERE questionsubject.theme = ?", [theme], (err, result) => {
    if(err) {
      res.status(418).send('An error occourd')
    }
    if(res){

      res.json(result);
    }
  })
})

app.get('/questions/:questions', (req, res) => {
  const questions = req.params.questions;

  db.query("SELECT * FROM questions WHERE questions.name = ?", [questions], (err, result) => {
    if(err) {
      res.status(418).send('An error occourd')
    }
    if(res){
      res.json(result);
    }
  })
})

app.listen(8080, () => {
  console.log('server listen')
})