const express = require('express')
const exphbs = require('express-handlebars')
const router = require('./router')
// const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

// app.use(flash())
// app.use((req, res, next) => {
//   res.locals.success_messages = req.flash('success_messages')
//   res.locals.error_messages = req.flash('error_messages')
//   next()
// })

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})