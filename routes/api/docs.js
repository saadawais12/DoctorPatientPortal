const express = require('express');
const router = express.Router();

//Item Model
const Doc = require('../../models/Doc');

// @route   GET api/items
// @desc    Get all items
// @access  Public

router.get('/',async(req,res)=>{
    await Doc.find().then(data=>res.json(data));
});


//fee filter
router.get('/fee/:id/:fee',async (req,res)=>{
    let check;
    let id = req.params.id;
    let id2 = req.params.fee;
    if(id=="All doctors"){
        if(id2==1){
            check = await Doc.find().sort({ charges:-1 });
        }
        if(id2==2){
            check = await Doc.find().sort({ charges:1 });
        }
        
    }
    else{
        if(id2==1){
            check = await Doc.find({ specialization: id }).sort({ charges : -1});
            
        }
        if(id2==2){
            check = await Doc.find({ specialization: id }).sort({ charges : 1});
            
        }
    }
    if(check){
        res.send(check);
    }else{
        res.send("0");
    }
    
    
    
});


router.get('/getDocName/:id',async(req,res)=>{
    
    let id = req.params.id.split(',');
    var doc;
    let docs = [];

    for(var i=0;i<id.length;i++){
        doc = await Doc.findById(id[i]);
        docs.push(doc)   
    }
    return res.send(docs);
    
});

//Login doc
router.post('/login',async(req,res)=>{
    
    let user = await Doc.findOne({ email: req.body.email , pwd : req.body.pwd });
    if (user){
        return res.send(user);
    }
    else
        return res.send("0");
});

//Register new doctor
router.post('/add',async(req,res)=>{
    newDoc = new Doc();
    newDoc.name = req.body.name,
    newDoc.email =req.body.email,
    newDoc.pwd = req.body.pwd,
    newDoc.qualification = req.body.qualification,
    newDoc.pmdc_no = req.body.pmdc_no,
    newDoc.specialization = req.body.specialization,
    newDoc.experience = req.body.experience,
    newDoc.address = req.body.address,
    newDoc.charges = req.body.charges,
    newDoc.desc  = req.body.desc,
    newDoc.StartTime = req.body.StartTime,
    newDoc.EndTime = req.body.EndTime
    
    await newDoc.save();

    let dataToReturn = {
        name: newDoc.name,
        id: newDoc._id,    
    };
    res.send(dataToReturn);
});

//Delete Doc
router
.delete('/del/:id',(req,res) =>{
    Doc.findById(req.params.id).then(item=> 
        item.remove().then(()=> res.json({ success: true })))
        .catch(err => res.status(404).json({success:false})); 
});



//Login doc
router.post('/filtsearch',async(req,res)=>{
    let n = req.body.search;
    let l = req.body.loc;
    var user;
    if(n=="null" && l!="null"){
       
        user = await Doc.find( {  specialization: l  });
    }
    else if(l=="null" && n!="null"){
        
        user = await Doc.find( {  name: n   });
    }
    else if(n!="null" && l!="null" ){
        
        user = await Doc.find( {  name: n , specialization: l   });
    }
    else if(n=="null" && l=="null" ){
       
       user = await Doc.find();
    }
     
    if (user){
        return res.send(user);
    }
    else{
        return res.send("null");
    }
        
        
});

//doctor category
router.get('/docCat/:id',async(req,res)=>{
    console.log(req.params.id)
    let check = await Doc.find({ specialization: req.params.id });
    if(check){
        res.send(check);
    }else{
        res.send("0");
    }
    

})

module.exports = router;