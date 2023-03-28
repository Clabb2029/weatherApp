var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    long: Number,
    lat: Number
 });
 var CityModel = mongoose.model('cities', citySchema);

 module.exports = CityModel;