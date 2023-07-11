const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const ledgerController = require('../controller/ledger-controller')
const userController = require('../controller/user-controller')
const { authenticated } = require('../middleware/auth')


router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }) ,userController.signIn)
router.get('/logout', userController.logout)
router.get('/ledger', authenticated, ledgerController.getLedger)
router.get('/', (req, res) => res.redirect('/ledger'))


module.exports = router