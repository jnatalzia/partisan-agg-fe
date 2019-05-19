const express = require('express');
const app = express();
const port = 3000;
let fixtureJSON;

app.use(express.static('public'));

app.get('/fixture.json', function(req, res){
  if (!fixtureJSON) {
    fixtureJSON = require('./fixtures/service-res.json');
  }
  res.setHeader('Content-type', 'application/json');
  res.send(fixtureJSON);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))