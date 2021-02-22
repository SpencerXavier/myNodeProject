//得到package
//ps. http module 不用額外install ,僅express要
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query="London";
  const apiKey = "589af1d3067c137f898ec9ab822df350";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apiKey+"&units=imperial";
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>The temp in London is "+ temp+"</p>");
      res.write("<h1>The weather in London is "+ weatherDescription+"</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});


app.listen(3000,function(req,res){
  console.log("I'm listening");
});
