const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/', (req,res) => {
  res.sendFile(__dirname + "/index.html");
})

router.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = "29fdec5d4d1555ca7c051907f4392cb2"
  const unit = "metric"
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  https.get(url, (response)=>{
    response.on('data', (data)=>{
      var WeatherData = JSON.parse(data);
      // console.log(WeatherData);
      var temp = WeatherData.main.temp
      const icon = WeatherData.weather[0].icon
      var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      var max_temp = WeatherData.main.temp_max;
      var min_temp = WeatherData.main.temp_min;
      var WeatherDescription = WeatherData.weather[0].description
      console.log(WeatherDescription)
      // res.write("<p>Weather description:" + WeatherDescription + "</p>")
      // res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>")
      // res.write("<img src=" + imageUrl + "></img>")
      res.render("weather", {temp:temp,
                            query:query,
                            imageUrl:imageUrl,
                            WeatherDescription:WeatherDescription,
                            max_temp:max_temp,
                            min_temp:min_temp})
    })
  })
})

module.exports = router;
