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
  }
}

module.exports = ledgerController