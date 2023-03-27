var mongoose = require('mongoose');
MDP_MONGODB = process.env.MDP_MONGODB;

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
mongoose.connect("mongodb+srv://Clabb:" + MDP_MONGODB + "@cluster0.agzxd.mongodb.net/weather_app?retryWrites=true&w=majority", options,        
    function(err) {
      console.log(err);
    }
);