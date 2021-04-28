const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
  }));

var cityname = "City";
var countryName = "";
var cityimg = "";
var temp = "Temp";
var feeling = "Let's find out";
var highf = "";
var windf = "";
var pressuref ="";
var lowf ="";
var humidityf ="";
var likef = "";

app.get("/" , (req , res)=>{
    res.render("weather" , {cities : cityname , countries: countryName , weatherimg: cityimg , cels: temp , feels: feeling , high:highf , wind:windf , pressure:pressuref , low:lowf , humidity : humidityf, like: likef});
})

app.post("/" , (req,res)=>{

    var town = req.body.cname;

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ town +"&appid=a461fd67568fd4af6f5dfdde9477c0e4&units=metric";

    https.get(url , (response)=>{
        response.on("data" , (d)=>{
            var weatherData = JSON.parse(d);
            status = weatherData.cod;
            if (status == 200) {
                cityname = weatherData.name;
                countryName = weatherData.sys.country;
                code = weatherData.weather[0].icon;
                temp = weatherData.main.temp;
                feeling = weatherData.weather[0].description;
                highf= weatherData.main.temp_max;
                windf= weatherData.wind.speed;
                pressuref= weatherData.main.pressure;
                lowf= weatherData.main.temp_min;
                humidityf= weatherData.main.humidity
                likef= weatherData.main.feels_like;
                cityimg = "http://openweathermap.org/img/wn/" + code + "@2x.png";
                res.render("weather",{cities : cityname , countries: countryName , weatherimg: cityimg , cels: temp , feels: feeling , high:highf , wind:windf , pressure:pressuref , low:lowf , humidity : humidityf, like: likef});
            } else
            res.render("weather",{cities : "Pls enter valid city name" , countries: "" , weatherimg: cityimg , cels: "" , feels: "" , high: "" , wind: "", pressure: "" , low: "" , humidity : "", like: ""});
        })
    })
})

app.get("/forecast" , (req , res)=>{
    res.send("WILL UPDATE SOON");
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log('Port running on localhost: 3000');
})