var express = require('express');
var router = express.Router();

// POST Sign Up
router.post('/sign_up', async function(req, res, next) {

  var alreadyExists = false;

  if (await UserModel.findOne({email: req.body.email })) {
    alreadyExists = true;
  }

  if (!alreadyExists) {
    var newUser = new UserModel ({
      username: req.body.username,
      email: req.body.email,
      password:  req.body.password
      });
      var UserSaved = await newUser.save();
  

    req.session.user = {
      username: UserSaved.username,
      _id : UserSaved._id
    } 

    res.redirect('weather');

  } else {
    error_signup = "An account already exists with this email";
    res.render('login', { title: 'Connexion - Weather App', error_signup:error_signup, error_signin:error_signin });
  }
});


// POST Sign In
router.post('/sign_in', async function(req, res, next) {

  var user = await UserModel.findOne({
    email: req.body.email, 
    password: req.body.password 
  });

  if (user) {
    req.session.user = {
      username: user.username,
      _id : user._id
    }
    res.redirect('weather');
  } else {
    error_signin = "Email or password incorrect";
    res.render('login', { title: 'Connexion - Weather App', error_signup:error_signup, error_signin:error_signin });
  }
});


// GET logout
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
