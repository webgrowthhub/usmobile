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
const SitemapGenerator = require('sitemap-generator');


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
var get_randomres=AllModel.Mobilerecords.aggregate([
  {$sample:{size:10}},
  { 
    "$match": {
        "companynumber": { 
            "$exists": true, 
            "$ne": ' ' 
        }
    }    
},
]);
get_randomres.exec((err,data)=>{
  res.render('index', { title: 'Express',random: data });
})
   
  });


  app.get('/sitemap.xml', function (req, res) {
   var urllll= ['about', 'javascript.html', 'css.html', 'html5.html'];
    var sitemap = generate_xml_sitemap(urllll); // get the dynamically generated XML sitemap
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
    
  })

  app.get('/sitemap.xml/:start', function (req, res) {
    var skipp=req.params.start;
    var skip_numbere=parseInt(skipp);
    var get_res=AllModel.Mobilerecords.find().skip(skip_numbere).limit(10000);
    get_res.exec((err,data)=>{
      var sitemap = generate_xml_sitemapURL(data); // get the dynamically generated XML sitemap
      res.header('Content-Type', 'text/xml');
      res.send(sitemap);
    })
    
   
     
   })

   function generate_xml_sitemapURL(urll) {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
  
    
    // XML sitemap generation starts here
    var priority = 0.5;
    var freq = 'daily';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    var i;
    urll.forEach(function (item) {
      if(item.companynumber != ''){
        xml += '<sitemap>';
        xml += '<loc>http://localhost/'+ item.companynumber  + '</loc>';
        xml += '<changefreq>'+ freq +'</changefreq>';
        xml += '<priority>'+ priority +'</priority>';
        xml += '</sitemap>';
       
      } 
    
    })
    xml += '</sitemapindex>';
    return xml;
  }

  app.get('/getRes', function (req, res) {
    var get_res=AllModel.Mobilerecords.find().limit(1);
    get_res.exec((err,data)=>{
      console.log(data);
    })
   })

  function generate_xml_sitemap(urll) {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
    var urls = urll;
    var count= 1000000;
    // the root of your website - the protocol and the domain name with a trailing slash
    var root_path = 'http://www.example.com/';
    // XML sitemap generation starts here
    var priority = 0.5;
    var freq = 'daily';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    var i;
    for (i = 0; i <=count; i+=10000) {
      xml += '<sitemap>';
      xml += '<loc>http://localhost/sitemap.xml/'+ i  + '</loc>';
      // xml += '<changefreq>'+ freq +'</changefreq>';
      // xml += '<priority>'+ priority +'</priority>';
      xml += '</sitemap>';
     
    }
    xml += '</sitemapindex>';
    return xml;
  }
  
  
  app.get('/aboutus', function(req, res, next) {
    res.render('aboutus');
  });

  app.post('/mark_number', function(req, res, next) {
    var company_no=req.body.phone_no;
    var mark_no=req.body.mark;
    var   currentIp=req.ipInfo.ip;
    var IpAddress=currentIp.split(':')[3];
    var city=req.ipInfo.city;
    var country=req.ipInfo.country;
    var Vistor_Ip=IpAddress+' '+city+','+country;
    var date_now=moment(Date.now()).fromNow();

      var NewRecord=new AllModel.MarkedRecords({
        companynumber: company_no,
        IpAdress: Vistor_Ip,
        mark : mark_no
         });

          NewRecord.save((err,saved)=>{
            if(saved){
              return res.send("true");
            }else{
              return res.send("false");
            }
          })

  });
  
  app.get('/faq', function(req, res, next) {
    res.render('faq');
  });
  
  app.get('/phone-number/:phonenumber/', function(req, res, next) {
    var ph_no=req.params.phonenumber;
    var get_res=AllModel.Mobilerecords.find({ companynumber : ph_no }).countDocuments();
    get_res.exec((err,Records)=>{
      if(Records > 0){
        var get_markedres=AllModel.MarkedRecords.find({ companynumber : ph_no }).limit(4);
        get_markedres.exec((err,Markedrecords)=>{
          var get_saferes=AllModel.MarkedRecords.find({ companynumber : ph_no , mark: "safe"}).countDocuments();
          get_saferes.exec((errr,safe_result)=>{
            var get_saferes=AllModel.MarkedRecords.find({ companynumber : ph_no , mark: "unsafe"}).countDocuments();
            get_saferes.exec((errr2,unsafe_result)=>{

              var get_randomres=AllModel.Mobilerecords.aggregate([
                {$sample:{size:10}},
                { 
                  "$match": {
                      "companynumber": { 
                          "$exists": true, 
                          "$ne": null 
                      }
                  }    
              },
              ]);
              get_randomres.exec((Geterror,RandomResult)=>{
                res.render('detail',{CurrentRecord: ph_no,Alldata: Markedrecords,moment: moment,Safe: safe_result, Unsafe: unsafe_result,random: RandomResult});
              })

             
            })
          
          })
         
        })  
      }else{
        var get_randomres=AllModel.Mobilerecords.aggregate([
          {$sample:{size:10}},
        { 
          "$match": {
              "companynumber": { 
                  "$exists": true, 
                  "$ne": null 
              }
          }    
      },]);
              get_randomres.exec((Geterror,RandomResult)=>{
                res.render('detail',{CurrentRecord: '',Alldata: '',moment: moment,random: RandomResult});

              })
      
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
