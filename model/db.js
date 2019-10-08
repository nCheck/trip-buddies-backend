var mongoose = require('mongoose'),
	database	 = 'mongodb://sanes4:sanes4ever@ds145194.mlab.com:45194/stroke-predict'
	
mongoose.connect(database , { useNewUrlParser: true });
mongoose.connection.on('connected' , () =>{
	console.log('connected');
});

require('./bill');
require('./trip');
require('./user');
