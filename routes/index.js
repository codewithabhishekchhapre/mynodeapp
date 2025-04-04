var express = require('express');
var fs=require("fs")
var router = express.Router();

/* GET home page. */

var name="abhishek"
var user=[];

router.get('/', function(req, res) {
  res.render("index.ejs",{data:name});
});

router.post('/submit', function(req, res) {
  console.log(req.body);
  var details={}
  details.name=req.body.name;
  details.email=req.body.email;
  details.mobile=req.body.phone;
  details.password=req.body.password;
  user.push(details)
  res.render("login.ejs");
})
router.post('/login', function(req, res) {
  
  var name=req.body.name;
  var password=req.body.password;
  if(user[0].name==name && user[0].password==password){
    res.send("login successfully")

  }
  
  res.render("login.ejs");
})

router.get("/user",function(req,res){
  res.render("createfile.ejs")

})

router.post("/makefile",function(req,res){

  var filename=req.body.filename;
  var data=req.body.data;

  fs.writeFile(`./files/${filename}`,data,function(err){
    if(err){
      console.log(err)
      res.send("error")
    }
    res.redirect("/allfile")
  })
})

router.get("/allfile",function(req,res){
  fs.readdir("./files",function(err,files){
    if(err){
      console.log(err)
      res.send("error")
    }
    console.log(files)
    res.render("allfile.ejs",{data:files})
  })
})

router.get("/delete/:filename",function(req,res){
    var filename=req.params.filename;
    fs.unlink("./files/"+filename,function(err){
      if(err){
        console.log(err)
      }
      res.redirect("/allfile")
    })

})



module.exports = router;
