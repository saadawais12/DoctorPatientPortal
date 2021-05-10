const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
//Item Model
const Patient = require('../../models/Patient');

// @route   GET api/Patient
// @desc    Get all Patient
// @access  Public

router.get('/',(req,res)=>{
    Patient.find().then(items=>res.json({gx :items}));
});


//Register new Patient
router.post('/add',async(req,res)=>{
    
    let user = await Patient.findOne({ email: req.body.email });
    if (user)
        return res.send("0");
        
    patient = new Patient();
    patient.name = req.body.name;
    patient.email = req.body.email;
    patient.pwd = req.body.pwd;

    // Hash password using Bcrypt
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(patient.pwd , salt , (err,hash)=>{
            if(err) throw err;
            patient.pwd = hash;
            patient.save().then(user=>{
                res.send(user)
            })

        })
    })


});


//Login patient
router.post('/login',async(req,res)=>{
    
    
    let user = await Patient.findOne({ email: req.body.email });
    if (user){
        bcrypt.compare(req.body.pwd , user.pwd).then(isMatch=>{
            if(!isMatch) return res.send("0");
            return res.send(user);
        })
        
    }
    else
        return res.send("0");
});

//Delete Patient
router
.delete('/del/:id',(req,res) =>{
    Patient.findById(req.params.id).then(item=> 
        item.remove().then(()=> res.json({ success: true })))
        .catch(err => res.status(404).json({success:false})); 
});




module.exports = router;