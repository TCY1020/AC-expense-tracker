// mongoose:連線設定功能
const mongoose = require('mongoose')

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI)

// 檢查資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db