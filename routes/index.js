var express = require('express');
var router = express.Router();

var User = require('../models/User.js');
var Proof = require('../models/Proof.js');

/* GET home page. */

function isLoggedIn(req, res, next) {
  if (!req.user) {
    next()
  } else {
    res.redirect('/dashboard');
  }
}

router.get('/', isLoggedIn, function(req, res) {
  var loginContext = req.flash('isLoginDirty');
  var isLoginDirty = false;
  if (loginContext.length > 0) {
    isLoginDirty = loginContext[0]
  }
  res.render('login', {
    title: 'Login to Proof Assistant',
    isLoginDirty: isLoginDirty
  });
});

router.get('/about', function(req, res) {
  res.render('about', {title: 'About Proof Assistant'})
});

router.get('/signup', isLoggedIn, function(req, res){
  var signupContext = req.flash('isSignupDirty')
  var isSignupDirty = false;
  var errMsg = "";
  if (signupContext.length>0){
    isSignupDirty = true;
    errMsg = signupContext[0];
  }
  res.render('signup', {
    title: 'Sign Up on Proof Assistant',
    isSignupDirty: isSignupDirty,
    errMsg: errMsg
  });
});

router.post('/register', function(req,res) {
  User.findOne({email:req.body.email}, function(err, user){
    if (err) {
      return next(err)
    }
    if (user) {
      req.flash("isSignupDirty", "Email already taken!");
      res.redirect('/signup');
    } else {
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function(err){
        if (err) {
          req.flash("isSignupDirty", "Server error, try again later!");
          res.redirect('/signup');
        } else {
          req.session.user = newUser;
          res.redirect('/dashboard');
        }
      });
    }
  });
});

router.post('/login', function(req, res, next){
  User.findOne({email:req.body.email}, '+password',function(err, user){
    if (err) {
      return next(err)
    }
    if (!user) {
        req.flash('isLoginDirty', true);
        res.redirect('/');
    } else {
      if (req.body.password === user.password) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        req.flash('isLoginDirty', true);
        res.redirect('/');
      }
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

router.get('/dashboard', requireLogin, function(req,res) {
  res.render('dashboard');
});

module.exports = router;
