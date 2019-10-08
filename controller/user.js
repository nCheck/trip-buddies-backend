const mongoose = require('mongoose');
const User = mongoose.model('User');
const Bill = mongoose.model('Bill');
const Trip = mongoose.model('Trip');


module.exports.addUser = (req , res) =>{

    query = req.body;

    console.log("[QUERY RECIEVED IS]" , query);

    if ( !query ){
        res.send({ status : "error" , data : [] });
    }

    User.create( query , (err , doc)=>{
     
        if (err){
            res.send({ status : "error" , data : err });
        }
        else{
            res.send( { status : "success" , data : doc } );
        }
        
    });

};


module.exports.getUser = ( req , res ) =>{

    let username = req.params.username;

    User.findOne( { username : username } , (err , doc) =>{

        if (err){
            res.send({ status : "error" , data : err });
        }
        else{
            res.send( { status : "success" , data : doc } );
        }

    } );

};

module.exports.getAllUser = ( req , res ) =>{

    User.find( {} , (err , doc) =>{

        if (err){
            res.send({ status : "error" , data : err });
        }
        else{
            res.send( { status : "success" , data : doc } );
        }

    } );

};

module.exports.getAllUsernames = ( req , res ) =>{

    User.find( {} , { name : true , username : true } , (err , doc) =>{

        if (err){
            res.send({ status : "error" , data : err });
        }
        else{
            res.send( { status : "success" , data : doc } );
        }

    } );

};

module.exports.acceptRequest = ( req , res )=>{

    var username = req.params.username;
    var tripid = req.params.tripid;

    User.updateOne({username} , { $push : { trips  : tripid } , $pull : { requests : tripid } })
        .then( (doc)=>{ res.send( { status : "success" , data : doc } ); } )
        .catch( (err) => { res.send({ status : "error" , data : err }); } );

};