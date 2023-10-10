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

app.get('/themeQuestions/:theme', (req, res) => {
  const theme = req.params.theme;
  console.log(req.params.theme)
  db.query("SELECT * FROM questionsubject WHERE questionsubject.theme = ?", [theme], (err, result) => {
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