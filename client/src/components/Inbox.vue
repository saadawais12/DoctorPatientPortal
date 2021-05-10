<template>
  <div class="container jumbotron jbx mt-5 col-lg-6" >
    <h3 class="ml-3 text-light ">
      Inbox
    </h3>
    <hr class="bg-light" />
    <div v-if="length===0">
      <h5 class="noMsg">Empty Inbox</h5>
    </div>
    <div
      class="mt-5 col-12 col-lg-6 crx"
      v-for="(post, i) in Msgs"
      v-bind:key="i"
    >
      <b-list-group style="width: 300px; " class="ss">

          <b-list-group-item class="d-flex align-items-center my" v-on:click="go(Msgs[i][0].msgFrom+','+Msgs[i][0].msgTo+','+Msgs[i][0].username+','+Msgs[i][0].msgToName)">
            <b-avatar class="mr-3"></b-avatar>
            <div>
              <!-- name of texter -->
              <span class="mr-auto text-dark">{{ Msgs[i][0].msgFrom==Uid ? Msgs[i][0].msgToName : Msgs[i][0].username  }}</span>
              <br>
              <!-- If new message arrived -->
              <span class="mr-auto text-dark " v-if="Msgs[i][0].msgFrom==Uid"> <fa-icon :icon="['fa', 'check']" size="1x" color="green" /> {{  Msgs[i][0].msg }}</span>
              
              <!-- Message sent -->
              <span class="mr-auto text-info" v-if="Msgs[i][0].msgFrom!=Uid">{{  Msgs[i][0].msg }}   </span>  
            
            </div>
          </b-list-group-item>
      </b-list-group>
    </div>
    <div class="text-center" v-if="loader">
      <div class="spinner-border" role="status" style="width: 5rem; height: 5rem;">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>



const io = require("socket.io-client");
const socket = io.connect("http://localhost:5000");
export default {
  name: "Inbox",
  data() {
    return {
      umer : "umer",
      Msgs: "",
      Uname : sessionStorage.getItem("Pname"),
      Uid : sessionStorage.getItem("Pid"),
      loader : true,
      length:""
    };
  },
  methods: {
    open(e) {
      window.location.href = `/Chat/${e}`;
    },
    listen(id){
      socket.emit('inbox',id);
      socket.on('got',pein=>{
        this.loader = false
        this.Msgs = pein;
        console.log(pein);
        this.length = pein.length
      })
    },
    go(e){
      var str = e;
      var res = str.split(",");
      let gox;
      let gon;
      if(res[0]==this.Uid){
        gox = res[1]
        gon = res[3]
      }
      if(res[0]!=this.Uid){
        gox = res[0];
        gon = res[2]
      }
      window.location.href=`/Chat/${gox}/${gon}`
    }
  },
  mounted() {
    //  if user is not logged in
    if (!sessionStorage.getItem("Pid") && !sessionStorage.getItem("did")) {
      window.location.href = "/";
    }
    let id;
    //  if patient is logged in
    if (sessionStorage.getItem("Pid")) {
      id = sessionStorage.getItem("Pid");
      this.listen(id);
    }
    //  if doc is logged in
    if (sessionStorage.getItem("did")) {
      id = sessionStorage.getItem("did"); 
      this.listen(id);
    }
  },
};
</script>
<style scoped>

.jbx {
  background-color:#066; border:1px solid lightgrey;
  border-radius: 10px;
  max-height: 650px;
  overflow-y: auto;
}
.my{
  transition: 0.3s;
  cursor: pointer;
}
.my:hover{
  padding: 20px;
}
.ss{
  white-space: nowrap; 
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  text-overflow: ellipsis; 
}
.noMsg{
  color: white;
  text-align: center;
  margin-top: 210px;
}

</style>