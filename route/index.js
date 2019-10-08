const express     =   require('express');
const router      =   express.Router();

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

router.route('/')
    .get( (req , res) =>{
     
        Customer.find({} , (err , doc)=>{

            if (err){
                res.send({ status : "error" , data : err });
            }
            else{
                res.render('index' , {customers : doc});
            }
    
        });
        
    })


module.exports = router;