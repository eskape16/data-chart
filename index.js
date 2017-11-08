const express = require('express')
const app = express()
const path = require('path')
const createDataset = require('./datasets')

app.use(express.static('public'))

app.get('/datasets', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send(createDataset())
})

const server = app.listen(3000, () => {
  console.log('server running at port: ' + server.address().port)
})
