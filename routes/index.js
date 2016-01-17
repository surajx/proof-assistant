var express = require('express');
var router = express.Router();

var User = require('../models/User.js');
var ProofModel = require('../models/Proof.js');

var proofObjSanitize = require('../util/util.js').proofObjSanitize;
var genNewProof = require('../FOL/proof/Proof.js').genNewProof;
var validateProofServer = require('../FOL/proof/Proof.js').validateProofServer;
var genProofLine = require('../FOL/proof/ProofLine.js').genProofLine;

/* TODO:
* (05/01/16)Brain - This file is bloated with stuff from all over the place
* (05/01/16)Hands - Tomorrow!
* (07/01/16)Brain - I beg of you, please refactor
* (07/01/16)Hands - Meh!
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
  ProofModel.find({userid:req.user.id, isDeleted:false}, function(err, proofs){
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
  var proofName = req.body.proofName.trim().replace(/\s\s+/g, ' ');
  var proofContainer = genNewProof(proofName);
  if (proofContainer.status===false){
    //TODO use proofContainer.err to display an error message in dashboard.
    console.log(proofContainer.err);
    res.redirect('/dashboard');
    return;
  }
  var proof = proofContainer.proof;
  var proofStatus = proofContainer.proofStatus;
  var newProof = new ProofModel();
  newProof.userid = req.user.id;
  newProof.proofStatus = proofStatus;
  newProof.proofName = proofName;
  newProof.proofData = proof;
  newProof.save(function(err, proof){
    if (err) {
      //TODO: Show an alert message that new proof creation resulted in an error.
      res.redirect('/dashboard');
    } else {
      res.redirect('/proover/'+proof.id)
    }
  });
});

router.get('/proover/:id', requireLogin, function(req,res){
  ProofModel.findOne({_id:req.params.id, userid:req.user.id, isDeleted:false}, function(err, proof){
    if (err || !proof) {
      res.redirect('/dashboard');
    } else {
      var ruleList = Object.keys(require('../FOL/proof/rules/rules.js'));
      res.render('proover', {proofModel: proof, ruleList: ruleList});
    }
  });
});

router.post('/proover/save/:id', requireLogin, function(req,res){
  var proof = proofObjSanitize(req.body);
  var v_st = validateProofServer(proof);
  if(!v_st.isProofValid) {
    res.json({status: false, err: v_st.err});
    return;
  }
  ProofModel.update({_id:req.params.id, userid:req.user.id, isDeleted:false},
    {proofData: proof, proofStatus: v_st}, function(err, updateResp){
      if(err) {
        res.json({status: false, err: "DB error!"});
        return;
      }
      if(updateResp.nModified===0) {
        res.json({status: false, err: "Proof Not found in DB!"});
        return;
      }
      res.json({status: true});
  });
});

router.post('/dashboard/delete/', requireLogin, function(req,res){
  var deleteArr = req.body.delete;
  if (deleteArr instanceof Array) {
    if(deleteArr.length>0){
      ProofModel.update({_id: {$in: deleteArr}, userid:req.user.id},
        {isDeleted: true},{multi: true}, function(err, updateResp){
          if(err) {
            res.json({status: false, err: "DB error!"});
            return;
          }
          if(updateResp.nModified===0) {
            res.json({status: false, err: "Proof Not found in DB!"});
            return;
          }
          res.json({status: true, msg: updateResp.nModified});
      });
    } else {
      res.json({status: false, err: "Nothing to delete."});
    }
  } else {
    res.json({status: false, err: "Invalid data received."});
  }
});

module.exports = router;
