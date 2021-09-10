const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator'); 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please insert a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'The password must be at least 6 characters long']
  }
});

// MONGOOSE PRE & POST HOOKS 
// fire fn BEFORE new user is saved to db; this: local instant of the user before being saved in the db; next(); leads to the next middleware
userSchema.pre('save', async function(next){
  console.log('user about to be created', this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); //this.pw refers to the pw the user tries to store
  next();
});

// fire fn AFTER new user is saved to db
userSchema.post('save', function(storedCredentials, next){
  console.log('a new user was created & saved', storedCredentials);
  next();
});

// model based on schema; name (e.g., 'user') must be the singular of db collection name
const User = mongoose.model('user', userSchema);

module.exports = User;