const express = require('express');
const fs = require('fs');
const path =require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
