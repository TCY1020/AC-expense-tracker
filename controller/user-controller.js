

const userController = {
  signInPage: (req, res) =>{
    res.render('signin')
  },
  signIn: (req,res) =>{
    req.flash('success_messages', '登入成功')
    res.redirect('ledger')
  },
  logout: (req, res, next) => {
    req.flash('success_messages', '登出成功!')
    req.logout(err =>{
      if(err) {return next(err)}
      res.redirect('/signin')
    })
  }
}

module.exports = userController