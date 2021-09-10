const mongoose = require('mongoose');
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
})

// model based on schema
// name (e.g., 'user') must be the singular of db collection name
const User = mongoose.model('user', userSchema);

module.exports = User;