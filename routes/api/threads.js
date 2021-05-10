const express = require('express');
const router = express.Router();
var Razorpay = require("razorpay");
//Item Model
const Thread = require('../../models/Thread');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.post("/payment/order", (req, res) => {
    params = req.body;
    instance.orders.create(params).then((data) => {
        res.send({ "sub": data, "status": "success" });
    }).catch((error) => {
        res.send({ "sub": error, "status": "failed" });
    })
});

router.post("/payment/verify", (req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', '<your secret>')
        .update(body.toString())
        .digest('hex');
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);
    var response = { "status": "failure" }
    if (expectedSignature === req.body.razorpay_signature)
        response = { "status": "success" }
    res.send(response);
});
const razorpay = new Razorpay({
    key_id: 'rzp_test_P6DhxTFG3ABlG8',
    key_secret: 'pQb381GYRACCHHi216cb5Lki'
})
router.post('/verification', (req, res) => {
    // do a validation
    const secret = '12345678'

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})
router.post('/razorpay', async (req, res) => {
      const payment_capture = 1
      const amount = req.body.amnt
      const currency = 'INR'
  
      const options = {
          amount: amount * 100,
          currency,
          receipt: "receipt#1",
          payment_capture
      }
  
      try {
          const response = await razorpay.orders.create(options)
          console.log(response)
          res.json({
              id: response.id,
              currency: response.currency,
              amount: response.amount
          })
      } catch (error) {
          console.log(error)
      }
  })

router.post('/pay',(req,res)=>{
    console.log(req.body)
    const post = new Tran(req.body);
    post.save((err)=>{
      if(err) return res.status(400).json({success : false , err});
      return res.status(200).json({success:true})
    })
})

router.get('/',(req,res)=>{
    Thread.find().sort({date:-1}).then(items=>res.json({gx :items}));
});


router.get('/filter/:id',async(req,res)=>{
    
    if(req.params.id=="Location"){
        await Thread.find().sort({date:-1}).then(items=>res.json({gx :items}));
    }else{
        await Thread.find({ location : req.params.id }).sort({date:-1}).then(items=>res.json({gx :items}));
    }

    
});

//get doc id's who pitched my thread
router.post('/getDocs',async(req,res)=>{
    let id = req.body.id;
    let tid = req.body.tid;
    
    await Thread.find({ threadOwner : id , _id : tid }).then(items=>res.json(items));
});

//useless api
router.get('/findIndex/:id',async(req,res)=>{
    let id = req.params.id;
    Thread.aggregate({
        $indexOfArray : {_id : id}
    }).then(a=>res.json(a));
});



//thread pitched
router.post('/pitch',async(req,res)=>{
        //logic//
        await Thread.updateOne({ _id : req.body.thread_id },{
            $set: {
                status : '0',
            },
            $push:{
                docId :req.body.Doc_id,
                docProposal : req.body.proposal
            }
        })
        .then(items=>res.json({gx :items}));
});

//check which threads has been pitched by doc
router.get('/check/:id',async(req,res)=>{
    let id = req.params.id;
    let user =await Thread.find({ docId: id });
    if(user){
        return res.send(user);
    }else{
        return res.send("0");
    }
});




//each patient data
router.get('/each_patient/:id',async(req,res)=>{
    let id = req.params.id;
    await Thread.find({ threadOwner: id }).sort({date:-1}).then(items=>res.json({gx :items}));

});


//each doc data
router.get('/each_doc/:id',async(req,res)=>{
    let id = req.params.id;
    await Thread.find({ docId: id }).sort({date:-1}).then(items=>res.json({gx :items}));

});

//count
router.get('/count',async (req,res)=>{
    await Thread.find().sort({date:-1}).countDocuments().then(items=>res.json(items));
});

//more ads
router.get('/next/:id',(req,res)=>{
    let num = req.params.id;
    console.log(typeof(num));
    let a = parseInt(num);
    console.log(typeof(a));
    Thread.find().sort({date:-1}).limit(a).then(items=>res.json({gx :items}));
});

router.post('/add',(req,res)=>{
    const newThread= new Thread({
        desc : req.body.desc,
        location : req.body.location,
        threadOwner : req.body.owner,
        threadOwnerName : req.body.ownerName
    });
    newThread.save().then(res.json("1"));
});

//Delete Doc
router
.delete('/del/:id',async(req,res) =>{
    let user = await Thread.findById(req.params.id)
    user.remove().then(item=>res.json({gx : item}))
    
});

module.exports = router;