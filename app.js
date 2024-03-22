require('dotenv').config()

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => { 

   const querry = req.body.cityName;
   const apikey = process.env.API_KEY;
   const unit = "metric"

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + querry +"&appid=" + apikey +"&units="+ unit +"";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("");
      res.write("<p> The weather is cureently " + weatherDiscription + "</p>");
      res.write(
        "<h1>the temperature of " + querry + " is " + temp + " degree celcius.</h1>"
      );
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
