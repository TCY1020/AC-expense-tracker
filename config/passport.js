const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

passport.use(new localStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  (req, email, password, cb) => {
    User.findOne({email})
    .then(user => {
      if (!user) return cb(null, false, req.flash('error_message', '帳號密碼輸入錯誤'))
      bcrypt.compare(password, user.password)
        .then(match => {
          if(!match) return cb(null, false, req.flash('error_message', '帳號密碼輸入錯誤'))
          return cb(null, user)
        })
    })
  }
))
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .lean()
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
})

module.exports = passport