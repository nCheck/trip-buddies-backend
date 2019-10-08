var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tripSchema = new Schema({
    
    name : {
        type : String,
        default : "That Goa Plan"
    } ,
    location : {
        type : String,
        required : true
    } ,
    startDate : {
        type : Date,
        default : Date.now()
    } ,
    endDate : {
        type : Date,
        default : Date.now()
    } ,
    buddies : [ { type : String } ],
    drive_url:{
        type:String,
    },
    bills : [{type : Schema.Types.ObjectId, ref: 'Bill'}],
    budget : {
        type : Number,
        default : 1000
    },
    contrib : [ { name : { type : String } , amount : { type : Number , default : 0 } } ]

});




module.exports = mongoose.model('Trip' , tripSchema);