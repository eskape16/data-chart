const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/datasets', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send([1,2,3])
})

const server = app.listen(3000, () => {
  console.log('server running at port: ' + server.address().port)
})
