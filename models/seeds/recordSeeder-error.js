const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const SEED_USER = require('../../user.json')

const db = require('../../config/mongoose')



db.once('open', () => {
  Promise.all(
    SEED_USER.map(SEED_USER => {
      return User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: bcrypt.hash( SEED_USER.password, 10 )
      })      
        .then(user => {
          const userId = user._id
          Category.find()
            .then(category => {
              const categoryId = category[Math.floor((Math.random() * category.length))]._id
              for (let i = 0; i <= 3; i++) {
                return Record.create({
                  name: faker.name.findName(),
                  amount: Math.floor(((Math.random() * 9) + 1) * 100),
                  userId,
                  categoryId
                })
              }
            })
          .catch(err => console.log(err))
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})