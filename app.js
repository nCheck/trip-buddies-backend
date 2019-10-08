var express                 =   require('express');
var app                     =   express();
var parser                  = require('body-parser');
const dir                   = __dirname;
const port                  =  process.env.PORT || 9966;

require('./model/db');


app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());



//setting middleware
app.use(express.static(dir + 'public')); 

//Serves resources from public folder
app.use('/public', express.static(dir + '/public'));


// Require Routes
var apiRoute = require('./route/api');
// var indexRoute = require('./route/index')

app.use('/api', apiRoute);
// app.use('/' , indexRoute )


app.listen(port , function () {
	console.log('Site is active on http://localhost:' + port+'/');
});