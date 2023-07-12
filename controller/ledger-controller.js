const User = require('../models/user')
const Record = require('../models/record')
const Category = require('../models/category')

const ledgerController = {
  getLedger: (req, res) => {
    const userId = req.user._id
    let totalAmount = 0
    return Promise.all([
      Record.find({ userId })
        .populate('categoryId')
        .lean(),
      Category.find()
        .lean()
        .sort({ _id: 'asc' }),
    ])
      .then(([userRecord, categories]) => {
        userRecord.forEach(record => totalAmount += record.amount)
        return res.render('index', { userRecord, categories, totalAmount })
      })
      .catch(err => next(err))
  },
  createExpend: (req, res, next) =>{
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('create-ledger', { categories }))
  },
  postExpend: (req, res, next) =>{
    const userId = req.user._id
    const { name, date, categoryId , amount} = req.body
    Record.create({
      name,
      date,
      categoryId,
      amount,
      userId
    })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
}

module.exports = ledgerController