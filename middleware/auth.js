const { getUser, ensureAuthenticated } = require('../helpers/auth-helper')

const authenticated = (req, res, next) =>{
  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}

module.exports = { authenticated }