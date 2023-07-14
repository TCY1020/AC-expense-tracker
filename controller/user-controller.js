const bcrypt = require('bcrypt')
const User = require('../models/user')

const userController = {
  signInPage: (req, res) =>{
    res.render('signin')
  },
  signIn: (req, res) =>{
    req.flash('success_messages', '登入成功')
    res.redirect('ledger')
  },
  logout: (req, res, next) => {    
    req.logout(err =>{
      if(err) {return next(err)}
      req.flash('success_messages', '登出成功!')
      res.redirect('/signin')
    })
  },
  signupPage: (req, res, next) => {
    res.render('signup')
  },
  signup: (req, res, next) => {
    if(req.body.password !== req.body.passwordCheck) throw new Error('密碼與驗證密碼不符')
    User.findOne({email: req.body.email})
      .then( user => {
        if (user) throw new Error('這個Email已註冊過')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號!')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  }
}

module.exports = userController