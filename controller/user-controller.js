

const userController = {
  signInPage: (req, res) =>{
    res.render('signin')
  },
  signIn: (req,res) =>{
    // req.flash('success_messages', '登入成功')
    res.redirect('ledger')
  }
}

module.exports = userController