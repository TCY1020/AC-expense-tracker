const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const ledgerController = require('../controller/ledger-controller')
const userController = require('../controller/user-controller')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')


router.get('/ledger/create', authenticated, ledgerController.createExpend)
router.post('/ledger/create', authenticated, ledgerController.postExpend)
router.get('/ledger', authenticated, ledgerController.getLedger)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }) ,userController.signIn)
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)
router.get('/logout', userController.logout)
router.get('/', (req, res) => res.redirect('/ledger'))
router.use('/', generalErrorHandler)


module.exports = router