var express = require('express');
var router = express.Router();

var User = require('../models/User.js');
var Proof = require('../models/Proof.js');

/* TODO:
* My Brain - This file is bloated with stuff from all over the place
* My Hands - Tomorrow!
*/

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
  //TODO: Fetch all the proofs the user has created and send as locals.
  Proof.find({userid:req.user.id}, function(err, proofs){
    var proofList = [];
    //TODO: if err do something
    if (proofs && proofs.length>0){
      proofs.forEach(function(proof){
        proofList.push({
          name:proof.proofName,
          id:proof.id,
          status: proof.proofStatus
        });
      });
    }
    res.render('dashboard', {proofList: proofList});
  });
});

router.post('/proover/new', requireLogin, function(req,res){
  var FOLParser = require('../FOL/parser/parser.js');
  if (FOLParser.isWFS(req.body.proofName).status){
    var seqArr = req.body.proofName.trim().split("⊢");
    var proofData = [];
    var proofGoal = "";
    if (seqArr.length==2){
      var premises = seqArr[0].split(",");
      var assumptionCnt = 1;
      premises.forEach(function(premise){
        proofData.push({
          assumptions   : assumptionCnt,
          line          : assumptionCnt,
          proofLine     : premise,
          justification : null,
          rule          : "A",
          type          : "line"
        });
        assumptionCnt +=1;
      });
      proofGoal = seqArr[1];
    } else {
      proofGoal = seqArr[0];
    }
    var newProof = new Proof();
    newProof.userid = req.user.id;
    newProof.proofStatus = false;
    newProof.proofName = req.body.proofName;
    newProof.proofData = proofData;
    newProof.proofGoal = proofGoal;
    newProof.save(function(err, proof){
      if (err) {
        //TODO: Show an alert message that new proof creation resulted in an error.
        res.redirect('/dashboard');
      } else {
        res.redirect('/proover/'+proof.id)
      }
    })
  } else {
    //TODO: Show an alert message that new proof creation resulted in an error.
    res.redirect('/dashboard');
  }
});

router.get('/proover/:id', requireLogin, function(req,res){
  //TODO: Fetch the corresponding proof and save it in locals.
  //TODO: if id is not avaiable send 404.
  console.log(req.params.id);
  Proof.findOne({_id:req.params.id}, function(err, proof){
    if (err) {
      res.redirect('/dashboard');
    } else {
      console.log(proof);
      res.render('proover', {proof: proof});
    }
  });
});

module.exports = router;
