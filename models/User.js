const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
})

// model based on schema
// name (e.g., 'user') must be the singular of database collection name
const User = mongoose.model('user', userSchema);

module.exports = User;