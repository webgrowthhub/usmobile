const mongoose= require('mongoose');
mongoose.connect('mongodb://rahul:joshadmin@159.89.238.39:27017/usmobile',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,});

var conn =mongoose.Collection;

var UserSechema=new mongoose.Schema({
    complaintid: String ,
    companynumber : String,
    createddate : String,
})

var RecordsSechema=new mongoose.Schema({
    currentoffset: Number,
    totalreacords: Number ,
    currentdate : String,
  
})

var MArkSechema=new mongoose.Schema({
    companynumber: String,
    IpAdress: String,
    MarkTime: String
   
})



var Mobilerecords = mongoose.model('mobileRecords', UserSechema);
var TotalMobilerecords = mongoose.model('totalRecords', RecordsSechema);
var MarkedRecords = mongoose.model('MArkedRecords', MArkSechema);
module.exports= {Mobilerecords,TotalMobilerecords,conn,MarkedRecords};
