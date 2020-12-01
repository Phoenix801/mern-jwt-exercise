const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');


// Login Page
//router.get('/signin', forwardAuthenticated, (req, res) => res.render('signin'));

// Register Page
//router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));
console.log('users route start')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const email = req.body.email;
  const phone = Number(req.body.phone);
  const user_type = req.body.user_type;

  console.log(req.body);

 /* let errors = [];

  if (!username || !email || !phone || !password || !password2 || !user_type) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('/add', {
      errors,
      username,
      email,
      phone,
      password,
      password2,
      user_type
    });
  } else*/ {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('/add', {
          errors,
          username,
          email,
          phone,
          password,
          password2,
          user_type
        });
      } else {
        const newUser = new User({
          username,
          email,
          phone,
          password,
          user_type
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/signin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'signin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('signin');
});

module.exports = router;