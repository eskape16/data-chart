const express = require('express');
const app = express();
const path = require('path');
const createDatasets = require('./datasets');

const numOfDatasets = 3;

app.use(express.static('public'));

app.get('/datasets', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(createDatasets(numOfDatasets));
});

const server = app.listen(3000, () => {
  console.log('server running at port: ' + server.address().port);
});
