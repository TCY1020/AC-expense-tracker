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
  createExpend: (req, res, next) => {
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('create-ledger', { categories }))
  },
  postExpend: (req, res, next) => {
    const userId = req.user._id
    const { name, date, categoryId , amount} = req.body
    if (!name || !date || !categoryId || !amount) throw new Error("All the form is required!")
    Record.create({
      name,
      date,
      categoryId,
      amount,
      userId
    })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  },
  editExpend: (req, res, next) => {
    return Promise.all([
      Record.findById(req.params.id)
        .lean(),
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
    ])
      .then(([userRecord, categories]) => {
        if (!userRecord) throw new Error("Record doesn't exist!")
        res.render('edit-ledger', { userRecord, categories })
      })
      .catch(err => next(err))
  },
  putExpend: (req, res, next) => {
    const { name, date, categoryId, amount } = req.body
    if (!name) throw new Error('Record name is required!')
    return Record.findByIdAndUpdate(
      req.params.id,{
        name,
        date,
        categoryId,
        amount
      })
      .then(() => res.redirect(`/ledger`))
      .catch(err => next(err))
  },
  deleteExpend: (req, res, next) => {
    return Record.findById(req.params.id)
      .then(userRecord => {
        if (!userRecord) throw new Error("Record did't exist!")
        userRecord.deleteOne()
      })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  }
}

module.exports = ledgerController