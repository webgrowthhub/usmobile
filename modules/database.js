const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/usmobile',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,});

var conn =mongoose.Collection;

var UserSechema=new mongoose.Schema({
    complaintid: String ,
    companynumber : String,
    createddate : String,
})



var Mobilerecords = mongoose.model('monileRecords', UserSechema);

module.exports= {Mobilerecords,conn};
