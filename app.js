const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb+srv://lindaluz:johnnydepp@blingbankbling.5khmk.mongodb.net/auth-node';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('index'));
app.get('/expense', (req, res) => res.render('expense'));
app.get('/hello', (req, res) => res.render('hello'));
app.get('/qrcode', (req, res) => res.render('qrcode'));
app.use(authRoutes);







