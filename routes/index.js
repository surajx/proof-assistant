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
  res.render('login', { title: 'Login to Proof Assistant' });
});

router.get('/about', function(req, res) {
  res.render('about', {title: 'About Proof Assistant'})
});

router.get('/signup', function(req, res){
  res.render('signup', {title: 'Sign Up on Proof Assistant'})
});

router.post('/register', function(req,res) {
  User.findOne({email:req.body.email}, function(err, user){
    if (err) {
      return next(err)
    }
    if (user) {
      res.render('signup', {
        isSignupDirty: true,
        errMsg: "Email already taken"
      });
    } else {
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function(err){
        if (err) {
          res.render('signup', {
            isSignupDirty: true,
            errMsg: "Server error, try again later"
          });
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
      res.render('login', { isLoginDirty: true });
    } else {
      if (req.body.password === user.password) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('login', { isLoginDirty: true });
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
