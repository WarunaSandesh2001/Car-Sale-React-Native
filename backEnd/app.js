const express = require('express')
const app = express()
const port = 4000

const userController = require('./routes/User')

app.use(express.json())

app.use('/users', userController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})