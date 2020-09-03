var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AllModel=require("./modules/database");
const cron = require("node-cron");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


cron.schedule("* */5 * * * *", function() {

  var getroww33=AllModel.TotalMobilerecords.find({_id : "5f0d9da752e91a0b3c4fb864"});
  getroww33.exec((errorr22,TotalrecodDtataa3)=>{
    var myDate = new Date(); 
    var registerdate=myDate.getDate();  
var registermonth=myDate.getMonth()+1;  
var registeryear=myDate.getFullYear(); 
var Datee= registerdate + "-" + registermonth + "-" +  registeryear;

    if(TotalrecodDtataa3[0].currentdate == Datee){
      var getroww=AllModel.TotalMobilerecords.find({_id : "5f0d9da752e91a0b3c4fb864"});
      getroww.exec((errorr,TotalrecodDtat)=>{
        if(TotalrecodDtat[0].currentoffset <= TotalrecodDtat[0].totalreacords){
          console.log(TotalrecodDtat[0].currentoffset);
           request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j&items_per_page=50&offset='+TotalrecodDtat[0].currentoffset, { json: true }, (err, ress2, body) => {
            // if (err) { return console.log(err); }
            var i;
             if(ress2.body.data){
            for(var i=0; i<50; i++){
   
            var NewImage=new AllModel.Mobilerecords({
              complaintid : ress2.body.data[i]['id'],
         companynumber : ress2.body.data[i]['attributes']['company-phone-number'],
          createddate : ress2.body.data[i]['attributes']['created-date'],
             
            });
            NewImage.save((err,saved)=>{})
          
          }
          var update_q2=AllModel.TotalMobilerecords.updateOne({_id : "5f0d9da752e91a0b3c4fb864"},{currentoffset : TotalrecodDtat[0].currentoffset+50});

          update_q2.exec();
       
      }
    
        });
        }

 
      })
    }else{

      
  request('https://api.ftc.gov/v0/dnc-complaints?api_key=BAPXsbAZaxNCLv0h43go32Rl0YwcUwiDHvElff7j', { json: true }, (err, ress, body) => {
    if (err) { return console.log(err); }
    var totol=ress.body.meta["record-total"];

    var myDate = new Date(); 
                var registerdate=myDate.getDate();  
      var registermonth=myDate.getMonth()+1;  
      var registeryear=myDate.getFullYear(); 
      var Datee= registerdate + "-" + registermonth + "-" +  registeryear;

    var update_q=AllModel.TotalMobilerecords.updateOne({_id : "5f0d9da752e91a0b3c4fb864"},{totalreacords : totol , currentdate : Datee});
    update_q.exec((err,Updated)=>{
      if(Updated){
     
      
      }
    })
   
});
    }


  })

});

/* GET home page. */
app.get('/', function(req, res, next) {
  
//   request('https://api.ftc.gov/v0/dnc-complaints?api_key=gWj2iYA256KcL1c0i778JRUvCRp7pBtOdBBfAhg2', { json: true }, (err, ress, body) => {
//     if(ress.body.data){
//     console.log(ress);
//     }

// })
    res.render('index', { title: 'Express' });
  });

  app.get('/check', function(req, res, next) {
    console.log("here");
  });
  
  
  app.post('/totalrecords', function(req, res, next) {
    
  
  });
  
  
  
  
  app.get('/aboutus', function(req, res, next) {
    res.render('aboutus');
  });
  
  app.get('/faq', function(req, res, next) {
    res.render('faq');
  });
  
  app.get('/detail', function(req, res, next) {
    res.render('detail');
  });
  
  
  app.get('/getalldata', function(req, res, next) {

  
  
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/check', (req,res)=>{  
 console.log("Fds");
  
});

module.exports = app;
