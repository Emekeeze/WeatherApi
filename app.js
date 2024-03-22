const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    
      const url ="https://api.openweathermap.org/data/2.5/weather?q=London&appid=a449ebe1698f4002a9e56faa6225ff02&units=metric";
      https.get(url, function (response) {
        response.on("data", function (data) {
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDiscription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon
          const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

          res.write("")
          res.write("<p> The weather ias cureently "  + weatherDiscription  + "</p>")
          res.write("<h1>the temperature of Lodon is " + temp + " degree celcius.</h1>");
          res.write("<img src=" + imgUrl + ">")
          res.send();
        });
      });
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
