const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ERROR HANDLING
// Flow: Signup error —> Populate object with error msg (email,pw or both) --> Return error msg -—> Send JSON back to user with error msg in catch fn
const handleErrors = (err) => {
  // console.log('errors', err.message, err.code);
  let errors = {email:'', password:''};

  // INCORRECT EMAIL
  if (err.message === 'The email is incorrect.') {
    errors.email = 'That email is not registered.'
  }

  if (err.message === 'The password is incorrect.') {
    errors.password = 'That password is incorrect.'
  }
  // DUPLICATED EMAIL
  if (err.code === 11000) {
    errors.email = "That email is already registered. Please choose another email.";
    return errors;
  } 

  // ERROR VALIDATION
  if (err.message.includes('user validation failed')) {
    // err.errors = object (contains properties (msg, path, value)); Object.values(err.errors = array with objects (with same properties)
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// GENERATE TOKEN
const maxAge = 2 * 24 * 60 * 60;
const createToken = (id) => {
  const signedToken = jwt.sign({ id }, 'string secret', {
    expiresIn: maxAge
  });

  return signedToken;
}


module.exports.signup_get = (req,res) => {
  res.render('signup'); 
}

module.exports.login_get = (req,res) => {
  res.render('login'); 
}

module.exports.signup_post = async (req,res) => {
  const { email, password } = req.body;  

  try {
    const user = await User.create({email, password}); // ID is created with every new user
    const token = createToken(user._id); 

    res.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.login_post = async (req,res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id); 
    res.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({ user: user._id });
  }
  catch (err) { // catches error from static method userSchema.statics.login 
    const errors = handleErrors(err);
    
    res.status(400).json({ errors });
  }

}

