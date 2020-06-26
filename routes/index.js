var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/check', function(req, res, next) {
  request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j', { json: true }, (err, ress, body) => {
  if (err) { return console.log(err); }
  console.log(ress.body.meta["record-total"]);
  res.send(ress.body);

    for (let index = 0; index < 50; index++) {
      console.log(index)
    }
  
    console.log('End')
  
});

});

module.exports = router;
