
const User = require('../models/User');


// ERROR HANDLING
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = {email:'', password:''};
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
    handleErrors(err);
    res.status(400).send('error, please try again');
  }
}

module.exports.login_post = async (req,res) => {
  const { email, password } = req.body; 
}

