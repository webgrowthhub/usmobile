var express = require('express');
var router = express.Router();
var AllModel=require("../modules/database");
const request = require('request');

/* GET home page. */
router.get('/check', function(req, res, next) {
  console.log("here");
});

// router.post('/getalldata', function(req, res, next) {
//   request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j', { json: true }, (err, ress, body) => {
//   if (err) { return console.log(err); }
//   console.log(ress.body.meta["record-total"]);
//   // res.send(ress.body);

// });

// });


router.post('/totalrecords', function(req, res, next) {
  request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j', { json: true }, (err, ress, body) => {
  if (err) { return console.log(err); }
  // var totol=ress.body.meta["record-total"];
  //  res.send({ total: JSON.parse(totol)});
res.send("cs");
});

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('aboutus');
});

router.get('/faq', function(req, res, next) {
  res.render('faq');
});

router.get('/detail', function(req, res, next) {
  res.render('detail');
});


router.post('/getalldata', function(req, res, next) {
  var offset2=req.body.Offsetcount;
  var offset=offset2*50;

       request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j&items_per_page=50&offset='+offset, { json: true }, (err, ress, body) => {
        if (err) { return console.log(err); }
        var i;
        for(var i=0; i<50; i++){
if(ress.body.data[i]){
        var NewImage=new AllModel.Mobilerecords({
          complaintid : ress.body.data[i]['id'],
     companynumber : ress.body.data[i]['attributes']['company-phone-number'],
      createddate : ress.body.data[i]['attributes']['created-date'],
         
        });
        NewImage.save((err,saved)=>{})
      
      }
    }
    });
  
    
   res.send(offset);



});



// router.get("/add",function(req,res){
//   console.log("hereee");
//   var NewImage=new AllModel.Mobilerecords({
//     username: 'Rahul',
   
//   });
//   NewImage.save((err,saved)=>{
//     if(saved){
//       return res.redirect("/");
//     }
//   })
// })

module.exports = router;