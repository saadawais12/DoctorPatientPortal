const app = require('express')();
const http = require('http').Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const docs = require("./routes/api/docs");
const threads = require("./routes/api/threads");
const patients = require("./routes/api/patients");
const items = require("./routes/api/items");
const {userJoin , getCurrentUser} = require("./routes/api/chats");

const cht = require('./models/Chat');
let messages = [];
let messages2 = [];




const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());



//run when client connect
app.post('/s',(req , res)=>{
  let id = req.body.MsgToId;
  let id2 = req.body.MsgFromId;
  cht.find({ $or:[ {msgTo:id , msgFrom :id2 } , {msgTo:id2 , msgFrom : id} ]}).then((result)=>{
    messages = result;
    res.json(messages);
  });
});



app.post('/d',(req , res)=>{
  let id = req.body.MsgToId;
  let id2 = req.body.MsgFromId;
  cht.find({ $or:[ {msgTo:id , msgFrom :id2 } , {msgTo:id2 , msgFrom : id} ]}).then((result)=>{
    messages = result;
    res.json(messages);
  });
});



io.on("connection",socket => {
  socket.on('join',({u , mt , mf , mtn})=>{
    const user = userJoin(socket.id , u, mt , mf , mtn); 
    socket.join(user.mt)
  });
  //  inbox Api
  
  socket.on('inbox' , async (id)=>{

    //  find all chats related to a single person
    await cht.find().or([{ msgTo: id }, { msgFrom: id }]).then((result)=>{
      messages2 = result;
    });
    // remove duplicates and push a single person chat to inbox
    let ids = [];
    for(var i=0;i<messages2.length;i++){
      if(!ids.includes(messages2[i].msgTo)){
        ids.push(messages2[i].msgTo)
      }
    }

    // we got ids of all users whome we have texted or recieved text in ids array. (including our id.)
    let mssgs = [];
    for(var i=0;i<ids.length;i++){
      // exculding our own id to get proper results.
      if(ids[i]!==id){ 
        let mxg = await cht.find({ $or:[{msgTo : ids[i]  , msgFrom :id } , {msgFrom : ids[i]  , msgTo : id} ]  }  ).sort({_id:-1}).limit(1);
        mssgs.push(mxg);
      }
    }
    io.to(socket.id).emit('got',mssgs);
  });
  
  // Chat API
  socket.on('msg',msg=>{
    const user = getCurrentUser(socket.id);
    let message  =  new cht({
      msgTo : user.mt,
      msgFrom : user.mf,
      username : user.name,
      msgToName : user.mtn,
      msg : msg
    });
    message.save((err,result)=>{
      if(err)throw err;
      messages = result;
    });

    io.to(user.mt).to(user.mf).emit('msg',message);
  });
});

    



// DB Config
const db = require("./config/keys").mongoURI;
//connection with db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/docs/", docs);
app.use("/api/threads/", threads);
app.use("/api/patients/", patients);
app.use("/api/items/",items);

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server started on port ${port}`));

