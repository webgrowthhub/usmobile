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
const querystring = require('querystring');
const expressip = require('express-ip');
const moment = require('moment');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressip().getIpInfoMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);


cron.schedule("*/6 * * * * ", function() {
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
           request('https://api.ftc.gov/v0/dnc-complaints?api_key=gWj2iYA256KcL1c0i778JRUvCRp7pBtOdBBfAhg2&items_per_page=50&offset='+TotalrecodDtat[0].currentoffset, { json: true }, (err, ress2, body) => {
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

      
  request('https://api.ftc.gov/v0/dnc-complaints?api_key=gWj2iYA256KcL1c0i778JRUvCRp7pBtOdBBfAhg2', { json: true }, (err, ress, body) => {
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
  var   currentIp=req.ipInfo.ip;
    var IpAddress=currentIp.split('-')[3];
    var city=req.ipInfo.city;
    var country=req.ipInfo.country;
    // console.log(moment('2020-09-18 14:59:32').fromNow());
  });
  
  
  app.get('/aboutus', function(req, res, next) {
    res.render('aboutus');
  });
  
  app.get('/faq', function(req, res, next) {
    res.render('faq');
  });
  
  app.get('/phone-number', function(req, res, next) {
    var ph_no=req.query.ph_no;
    var get_res=AllModel.Mobilerecords.find({ companynumber : ph_no }).countDocuments();
    get_res.exec((err,Records)=>{
      if(Records > 0){
        res.render('detail',{CurrentRecord: ph_no});
      }else{
        res.render('detail',{CurrentRecord: ''});
      }
    })
    
  });
  
  
  app.post('/get_results', function(req, res, next) {

  var phon_no=req.body.phone_no;
  var get_res=AllModel.Mobilerecords.find({ 'companynumber': {'$regex': phon_no} }).limit(15);
  get_res.exec((err,data)=>{
    if(data[0]){
      res.send(data);
    }else{
      res.send('false');
    }
    
  })
  
  });
  
  
  

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



module.exports = app;
