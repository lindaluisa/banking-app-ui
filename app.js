const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb+srv://lindaluz:jd123@blingbankbling.5khmk.mongodb.net/auth-node';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('index'));
app.get('/expense', (req, res) => res.render('expense'));
app.get('/hello', (req, res) => res.render('hello'));
app.get('/qrcode', (req, res) => res.render('qrcode'));
app.use(authRoutes);



// cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('NEW_USER', false); // res.setHeader('new-cookie', 'NEW_USER=false');
  res.cookie('IS_PRO_USER', true , { maxAge: 1000* 60 * 60 *24});
  res.send('cookie is set!');
});

app.get('/read-cookies', (req,res) => {
  const cookies = req.cookies;

  res.json(cookies);
});



