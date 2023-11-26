const express = require('express');
const router = express.Router();
const https = require('https');
router.get('/', (req, res) => {
  res.render('Forcast');
})

router.post('/', (req,res) => {
  const query = req.body.cityName;
  const apiKey = "29fdec5d4d1555ca7c051907f4392cb2";
  const unit = "metric"
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + apiKey + "&unit=" + unit
  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const forcastData = JSON.parse(data);
      var temp = forcastData.list[0].main.temp;
      res.render("Forcast", { temp: temp });
    });
  }).on('error', (error) => {
    console.error(`Error fetching data: ${error.message}`);
    res.render('ErrorPage');
  });
})

module.exports = router;
