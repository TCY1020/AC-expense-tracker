# Expense Tracker(記帳本)
![Expense Tracker-首頁](./public/imge/Recording%202023-07-13%20at%2012.44.15.gif)
## 介紹

記錄屬於自己的帳戶支出，使用者可以登入帳戶、記錄支出、新增及刪除支出、依照分類瀏覽支出狀況。
### 功能
* 查看所有支出
* 新增支出
* 編輯支出
* 刪除支出
* 使用者驗證功能
* 根據類別篩選支出並依篩選類別瀏覽總金額
## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：
  ```
  npm install
  ```
4. 與資料庫連線，請繼續輸入：
  ```
  npm run seed
  ```
5. 若看見此行訊息則代表與資料庫連結成功
  ```
  mongoDB connected!
  ```
6. 若看見此行訊息代表種子資料創建成功
 ```
  mongodb connected!
  done.
  mongodb connected!
  Record done.
  ```
7. 安裝完畢後，繼續輸入
+ 一般啟動:
```
npm run start
```
+ nodemon啟動:
```
npm run dev
```
8. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
  ```
  App is running on http://localhost:3000
  ```
9. 若欲暫停使用
  ```
  ctrl + c
  ```
### 測試帳號
若種子資料創建成功，可使用測試帳號:
+ 使用者1(野原美冴):
  - 帳號: qwe@qwe.com
  - 密碼: qwe 
+ 使用者2(野原廣智):
  - 帳號: aaa@aaa.com
  - 密碼: aaa
+ 使用者3(野原新之助):
  - 帳號: bbb@bbb.com
  - 密碼: bbb
+ 使用者4(野原向日葵):
  - 帳號: ccc@ccc.com
  - 密碼: ccc

## 開發工具

* "bcrypt": "^5.1.0",
* "connect-flash": "^0.1.1",
* "express": "^4.17.1",
* "express-handlebars": "^5.3.3",
* "express-session": "^1.17.3",
* "handlebars-dateformat": "^1.1.3",
* "method-override": "^3.0.0",
* "mongoose": "^7.3.2",
* "passport": "^0.6.0",
* "passport-local": "^1.0.0"