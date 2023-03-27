var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
mongoose.connect('mongodb+srv://Clabb:Clarouche@cluster0.agzxd.mongodb.net/weather_app?retryWrites=true&w=majority', options,        
    function(err) {
      console.log(err);
    }
);