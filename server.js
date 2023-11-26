const express = require('express');
const https = require('https');
const path = require('path');
const ejs = require('ejs');
var app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
const bodyParser = require('body-Parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('Public'));
app.set('views', path.join(__dirname,'views'));
const weatherDetail = require('./routes/weather');
const ForcastDetail = require('./routes/Forcast');
app.use('/weather',weatherDetail);
app.use('/Forcast', ForcastDetail);

app.get('/About', (req,res) => {
  res.render('About');
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
  console.log("Start listening at port" + port);
})
