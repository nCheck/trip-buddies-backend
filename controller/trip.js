const mongoose = require('mongoose');
const User = mongoose.model('User');
const Bill = mongoose.model('Bill');
const Trip = mongoose.model('Trip');
const Places = require('../data/places');



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

module.exports.deleteTrip = (req , res)=>{

    var tripid = req.params.tripid;

    Trip.deleteOne({_id : tripid}, (err , doc)=>{

        if (err){
            res.send({error : err});
        }
        else{
            res.send({status : "success", data : doc})
        }

    })

}

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



// module.exports.recommendPlace = ( req , res )=>{

//     var recs = req.body.filters;
//     var matches = []

//     matcher = (plc , rec) => {

//         for ( var r of rec ){
//             if ( plc.some( (p) => { return p == r } ) )
//             return true;
//         }

//         return false;

//     }

//     Places.forEach( (place) =>{

//         if ( matcher(place.tags, recs) )
//         {
//             matches.push(place);
//             console.log("matches currently", matches)
//         }

//     })

//     res.send( { data : matches } );

// }


module.exports.recommendPlace = ( req , res )=>{

    var recs = req.params.filter;
    var matches = []

    matcher = (plc , rec) => {
        for (var p of plc)
        {
            if( p == rec ){
                return true;
            }
        }
    return false;
    }

    Places.forEach( (place) =>{

        if ( matcher(place.tags, recs) )
        {
            matches.push(place);
        }

    })

    res.send( { data : matches } );

}

module.exports.getAllPlaces = ( req , res )=>{

    res.send( { data : Places } );

}