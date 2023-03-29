const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    // console.log(req.body.lat);
    // console.log(req.body.lon);
    const qlat=req.body.lat;
    const qlon=req.body.lon;
    const apiKey = "92423d60899b923136e174fd1b5c5e18";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+qlat+"&lon="+qlon+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const qcity= weatherData.name;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+weatherDescription+".</p>");
            res.write("<h1>The temperature in " + qcity + " is " + temp +" degrees Celsius.</h1>");
            res.write("<img src = "+imageURL+">");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});