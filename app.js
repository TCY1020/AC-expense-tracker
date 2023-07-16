const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const handlebars = require('handlebars')
const passport = require('./config/passport')
const router = require('./router')
const { getUser } = require('./helpers/auth-helper')



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const app = express()
const port = process.env.PORT || 3000
// 引用npm handlebars-dateformat調整日期格式
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'))

app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET || "ThisIsMySecret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize()) // 增加這行，初始化 Passport
app.use(passport.session()) // 增加這行，啟動 session 功能
app.use(methodOverride('_method'))

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})