const User = require('../models/User');

// ERROR HANDLING
// Flow: Signup error —> Populate object with error msg (email,pw or both) --> Return error msg -—> Send JSON back to user with error msg in catch fn
const handleErrors = (err) => {
  console.log('err code', err.code);
  let errors = {email:'', password:''};

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

module.exports.signup_get = (req,res) => {
  res.render('signup'); 
}

module.exports.login_get = (req,res) => {
  res.render('login'); 
}

module.exports.signup_post = async(req,res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.create({email, password});
    res.status(201).json(user);
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.login_post = async (req,res) => {
  const { email, password } = req.body; 
}

