var mongoose = require('mongoose'),
	database	 = 'mongodb://localhost:27017/demodb'
	
mongoose.connect(database , { useNewUrlParser: true });
mongoose.connection.on('connected' , () =>{
	console.log('connected');
});

require('./bill');
require('./trip');
require('./user');
