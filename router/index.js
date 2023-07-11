const express = require('express')
const router = express.Router()
const ledgerController = require('../controller/ledger-controller')
const userController = require('../controller/user-controller')


router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
router.get('/ledger', ledgerController.getLedger)
router.get('/', (req, res) => res.redirect('/ledger'))


module.exports = router