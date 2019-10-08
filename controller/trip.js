const mongoose = require('mongoose');
const User = mongoose.model('User');
const Bill = mongoose.model('Bill');
const Trip = mongoose.model('Trip');




// add a trip: form will be well named

module.exports.addTrip = ( req , res )=>{

    var data = req.body;
    var buddies = req.body.buddies;
    var creator = req.params.username;

    Trip.create(data , (err  ,doc)=>{

        // requesting trips to the friends
        User.updateMany( { username : { $in : buddies } } , { $push : { requests : doc._id } } , (err , usrs)=>{

            if (err){
                res.send({ status : "error 1" , error : err });
            }
            else{
                // adding trip to creator
                User.update({ username : creator } , { $push : { trips  : doc._id } })
                    .then( (fin)=>{ res.send({ status : "success" , data : fin }); } )
                    .catch((errr)=>{ res.send({ status : "error 2" , error : errr }); });
                
            }

        });

    });

};

// get all trips of a user

module.exports.getTrips = ( req , res )=>{

    var username = req.params.username;

    User.find( {username} ).populate('trips').exec( (err , doc)=>{

        if (err){
            res.send({ status : "error" , data : err });
        }
        else{
            res.send( { status : "success" , data : doc.trips } );
        }        

    });

};