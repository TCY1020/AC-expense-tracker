const Category = require('../category')
const SEED_CATEGORY = require('../../category.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  Category
    .create(SEED_CATEGORY)
    .then(() => {
      console.log('done.')
      process.exit()
    })
})