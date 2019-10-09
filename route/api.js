const express     =   require('express');
const router      =   express.Router();


const userCtrl = require('../controller/user');
const billCtrl = require('../controller/bill');
const tripCtrl = require('../controller/trip');


// user apis

router.route('/verify/:username/:password')
    .get(userCtrl.verifyUser);

router.route('/user')
    .get( userCtrl.getAllUser )
    .post( userCtrl.addUser );

router.route('/user/usernames')
.get( userCtrl.getAllUsernames );

router.route('/user/:username')
    .get( userCtrl.getUser );

router.route('/user/:username/:tripid')
    .get( userCtrl.acceptRequest );

router.route('/reject/:username/:tripid')
.get( userCtrl.rejectRequest );

// bill apis

// router.route('/bill/:tripid')
//     .get()
//     .post();

// trip apis

router.route('/trip/:username')
    .get(tripCtrl.getTrips)
    .post(tripCtrl.addTrip);


router.route('/recommend/:filter')
    .get( tripCtrl.recommendPlace );

router.route('/places')
    .get(tripCtrl.getAllPlaces);


/*
To learn more about method chaining, refer:
https://medium.com/backticks-tildes/understanding-method-chaining-in-javascript-647a9004bd4f
*/

module.exports = router;