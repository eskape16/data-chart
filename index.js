const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send("Hello Data Chart")
})

const server = app.listen(3000, function() {
  console.log('server running at port: ' + server.address().port)
})
