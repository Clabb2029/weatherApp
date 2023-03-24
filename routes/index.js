var express = require('express');
var router = express.Router();
var request = require('sync-request');


var cityList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connexion - Weather App' });
});


router.get('/weather', function(req, res, next) {
  var error_message = "";
  res.render('weather', { title: 'Accueil - Weather App', cityList:cityList, error_message:error_message });
});


router.post('/add_city', function(req, res, next) {

  var alreadyExists = false;
  var error_message = "";

  for (var i=0 ; i<cityList.length ; i++) {
    if (req.body.ville.toLowerCase() == cityList[i].ville.toLowerCase()) {
      alreadyExists = true;
    }
  }

  if (!alreadyExists) {
    var query = request("GET","https://api.openweathermap.org/data/2.5/weather?q="+ req.body.ville + "&appid=92862941fe4afacd8c0bdedb902200f7&lang=fr&units=metric");
    var dataAPI = JSON.parse(query.body);
    console.log(dataAPI);

      if (dataAPI.cod !== 200) {
        error_message = dataAPI.message;
      } else {
        var ville = dataAPI.name;
        var temps = dataAPI.weather[0].description;
        var icon = "https://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + "@2x.png";
        var temp_min = dataAPI.main.temp_min;
        var temp_max = dataAPI.main.temp_max;
              
        cityList.push(
          {"ville": ville, "temps": temps, "icon": icon, "temp_min": temp_min, "temp_max": temp_max}
        )
      } 
    }  
  res.render('weather', { title: 'Accueil - Weather App', cityList:cityList, error_message:error_message });
});


router.get('/delete_city', function(req, res, next) {

  cityList.splice(req.query.position, 1);

  res.render('weather', { title: 'Accueil - Weather App', cityList:cityList });
});


router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Accueil - Weather App'});
});


module.exports = router;
