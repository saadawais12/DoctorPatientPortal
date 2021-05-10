const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');
const Chats = require('../../models/Chat');
let messages = [];





router.get('/ss',(req,res)=>{
    Chats.find().then(items=>res.json({items}));
});

router.get('/ssf',async(req,res)=>{

    let x = await Chats.find({ $or:[{msgTo : "5ff9f46ef24e54d1c8b0da82"  , msgFrom : "5ff9ed5c226cc0ce6cf43f60"} , {msgFrom : "5ff9f46ef24e54d1c8b0da82"  , msgTo : "5ff9ed5c226cc0ce6cf43f60"} ]  }  ).sort({_id:-1}).limit(1);
   
    if(x){
       console.log(x);
    }
    else{
        return res.send("no");
    }
});

//Inbox API
router.get('/msgs/:id',async(req,res)=>{
    let id = req.params.id;
    await Chats.find({msgTo:id} , 'msgFrom' ).then((result)=>{
        messages = result;
      });
      let ids = [];
      messages.map((msg,i)=>{
        if(ids[i]!=msg.msgFrom){
            ids.push(msg.msgFrom)
        }   
      })
      let newIds = [];
      for(let j=0;j<ids.length;j++){
          if(newIds.indexOf(ids[j]) === -1){
            newIds.push(ids[j]);
          }
      }
      console.log(newIds)
      
      let mssgs = [];
      for(var i=0;i<newIds.length;i++){
       // mxg = await Chats.find({msgTo : id , msgFrom:newIds[i]} , ['msg' , 'msgFrom' , 'msgToName' , 'username']).sort({_id : -1}).limit(1);
        let mxg = await Chats.find({ $or:[{msgTo : newIds[i]  , msgFrom :id } , {msgFrom : newIds[i]  , msgTo : id} ]  }  ).sort({_id:-1}).limit(1);
       // mxg = await Chats.find({ $or:[ {msgTo:id , msgFrom :newIds[i] } , {msgTo:newIds[i] , msgFrom : id} ]} , ['msg' , 'msgFrom' , 'msgToName' , 'username'] ).sort({_id : -1}).limit(1)
        mssgs.push(mxg);
      }
      return res.send(mssgs);
       
});




router
.delete('/del/:id',(req,res) =>{
    let s =Chats.remove({username : 'vadu'})
    if(s){
        res.send("done")
    }
});

router.get('/',(req,res)=>{
    Item.find().sort({date : -1}).then(items=>res.json({gx :items}));
});

router.post('/add',(req,res)=>{
    const newItem = new Item({
        name : req.body.name
    });
    newItem.save().then(item=>res.json(item)).then(res.json("success"));
})

module.exports = router;