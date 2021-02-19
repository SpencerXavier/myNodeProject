const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("express");

const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,function(req,res){
  console.log('we are listening on port 3000');
});

let items = [];

app.get("/",function(req,res){
  var today = new Date();
  var currentDay = today.getDay();
  res.render('list',{
    kindOfDay:currentDay,
    newListItem:items
  });
});
app.get("/about",function(req,res){
  res.render('about');
});

app.post("/",function(req,res){
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});
