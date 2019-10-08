var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    
    username : {
        type : String,
        required : true
    } ,

    name : {
        type : String,
        default : "Gaurav Rai"
    } ,
    password:{
        type:String,
        required:true
    },
    trips : [{type : Schema.Types.ObjectId, ref: 'Trip'}],
    requests : [{type : Schema.Types.ObjectId, ref: 'Trip'}]

});




module.exports = mongoose.model('User' , userSchema);