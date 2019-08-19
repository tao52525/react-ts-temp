import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-token'
  )
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'alex' && password === '111') {
    res.send({ code: 0, data: '登录成功' })
  } else {
    res.send({ code: 1, data: '登录失败' })
  }
})

app.listen(9001)
