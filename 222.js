const record = require('./record.json')
const a = record[0]
console.log(a)

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
  email: 'ddd@ddd.com',
  password: 'ddd',
  recordNumber: [5]
}
]

console.log(SEED_USER.length)