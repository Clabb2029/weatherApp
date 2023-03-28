WEATHER_API_KEY = process.env.WEATHER_API_KEY;
var express = require('express');
var router = express.Router();
var request = require('sync-request');

var CityModel = require('../models/cities');
var UserModel = require('../models/users')

var cities = [];
var error_message = "";
var error_signup = "";
var error_signin ="";


// GET home page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Connexion - Weather App', error_signup:error_signup, error_signin:error_signin });
});


// GET weather page
router.get('/weather', async function(req, res, next) {

  // if (req.session.user == null) {
  //   res.redirect('/');
  // } else {
    cities = await CityModel.find();
    res.render('weather', { title: 'Accueil - Weather App', cities:cities, error_message:error_message });
  // }
});


// POST Add city
router.post('/add_city', async function(req, res, next) {

  var alreadyExists = false;

  if (await CityModel.findOne({name: req.body.ville })) {
    alreadyExists = true;
  }
  
  if (!alreadyExists) {
    var query = request("GET","https://api.openweathermap.org/data/2.5/weather?q="+ req.body.ville + "&appid=" + WEATHER_API_KEY + "&lang=fr&units=metric");
    var dataAPI = JSON.parse(query.body);
    console.log(dataAPI);

      if (dataAPI.cod !== 200) {
        error_message = dataAPI.message;
      } else {        
        var newCity = new CityModel ({
          name: dataAPI.name,
          desc: dataAPI.weather[0].description,
          img: "https://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + "@2x.png",
          temp_min: dataAPI.main.temp_min,
          temp_max: dataAPI.main.temp_max,
          long: dataAPI.coord.lon,
          lat: dataAPI.coord.lat
        });
        
        await newCity.save();
      }

      cities = await CityModel.find();
  }  
  res.render('weather', { title: 'Accueil - Weather App', cities:cities, error_message:error_message });
});


// GET delete city
router.get('/delete_city', async function(req, res, next) {

  await CityModel.deleteOne({_id: req.query._id});
  cities = await CityModel.find();

  res.render('weather', { title: 'Accueil - Weather App', cities:cities, error_message:error_message });
});


// GET Update cities list info
router.get('/update_cities', async function(req, res, next) {

  cities = await CityModel.find();

  for (var i=0 ; i<cities.length ; i++) {
    var query = request("GET","https://api.openweathermap.org/data/2.5/weather?q="+ cities[i].name + "&appid=" + WEATHER_API_KEY + "&lang=fr&units=metric");
    var dataAPI = JSON.parse(query.body);
  
    await CityModel.updateOne({
      _id: cities[i]._id
    },{
      name: cities[i].name,
      desc: dataAPI.weather[0].description,
      img: "https://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + "@2x.png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
      long: dataAPI.coord.lon,
      lat: dataAPI.coord.lat
    })
  }
  cities = await CityModel.find();
    
  res.render('weather', { title: 'Accueil - Weather App', cities:cities, error_message:error_message});
});


module.exports = router;
