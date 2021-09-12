const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://lindaluz:<pw>@blingbankbling.5khmk.mongodb.net/auth-node';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
// app.get('/expense', (req, res) => res.render('expense'));
app.get('/expense', requireAuth, (req, res) => res.render('expense'));
app.get('/hello', requireAuth, (req, res) => res.render('hello'));
app.get('/qrcode', requireAuth, (req, res) => res.render('qrcode'));
app.use(authRoutes);




