const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcrypt')
const recordList = require('../../record.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const SEED_USER = [{
  name: '"野原美冴',
  email: 'qwe@qwe.com',
  password: 'qwe',
  recordNumber: [0, 1, 2, 4]
},
{
  name: '野原廣智',
  email: 'aaa@aaa.com',
  password: 'aaa',
  recordNumber: [0, 1, 2]
},
{
  name: '野原新之助',
  email: 'bbb@bbb.com',
  password: 'bbb',
  recordNumber: [3]
},
{
  name: '野原向日葵',
  email: 'ccc@ccc.com',
  password: 'ccc',
  recordNumber: [5]
}
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  return Promise.all(Array.from(
    { length: SEED_USER.length },
    (_, i) =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: SEED_USER[i].recordNumber.length }, 
          (_, j) => {
            const seederNumber = SEED_USER[i].recordNumber[j]
            const categoryName = recordList[seederNumber].category
            return Category.findOne({ name: categoryName })
              .lean()
              .then(category =>{
                const categoryId = category._id
                return Record.create({
                  ...recordList[seederNumber],
                  userId,
                  categoryId
                })
              })
          }))
      })
))
    .then(() => {
      console.log('Record done.')
      process.exit()
    })
})