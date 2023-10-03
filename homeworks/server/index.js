const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'h3l3n@86',
  database: 'glosor'
})

app.post('/signup', (req, res) => {
const username = req.body.username;
const password = req.body.password;

db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
  if(err) {
    console.log(err)
  }
  else {
    res.send({username: username})
  }
})
})

app.listen(8080, () => {
  console.log('server listen')
})