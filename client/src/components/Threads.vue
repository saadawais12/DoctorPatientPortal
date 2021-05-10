<template>
  <div>
    <div class="container">
      <div class="loader" v-if="loader"></div>
      <b-modal ref="my-modal" hide-footer title="Proposal">
      <div class="d-block">
        <h5>Send a proposal to patient</h5>
        <textarea
              class="form-control"
              rows="3"
              v-model="proposal"
            ></textarea>
        
      </div>
      <b-button class="mt-3 float-right" style="backgroundColor:#056162" @click="hideModal">Send</b-button>
    </b-modal>
      <h2 style="color: #333333" class="mt-5">On going threads..</h2>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mt-4">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Threads</li>
          <li class="breadcrumb-item active" aria-current="page"></li>
        </ol>
      </nav>


      <div >
        <div style="background-color: #efefef" v-if="visible">
      <div>
        <div class="con">
          <img src="../assets/ok.png" width="100%" height="450vh" style=" borderRadius:30px;" >
        <h3 class="text">Welcome to DocPat E-Hospital</h3>
        </div>

      
        <div class="thrdx container mt-5">
          <label for="gg" style="color: #333333; font-size: 30px"
            >Post your problem</label
          >
          <div class="alert alert-info" role="alert" v-if="log">
            {{ log }}
          </div>

          <textarea
            class="form-control col-12 col-lg-6 mt-3"
            id="gg"
            rows="5"
            placeholder="Breifly describe your problem..."
            v-model="desc"
          ></textarea>

          <select
            id="inputState"
            class="form-control col-lg-6 mt-3"
            v-on:change="locX($event)"
          >
            <option selected>Location</option>
            <option>Lahore</option>
            <option>Sialkot</option>
          </select>
          <br/>
          <div class="alert alert-warning" role="alert" v-if="error">
            {{ error }}
          </div>

          <div class="mt-1">
            <button class="btn btn-success col-lg-2 col-5" style="backgroundColor:#056162"  v-on:click="submit">
              POST
            </button>
          </div>
          <hr style="background-color: white" />
        </div>

        
      </div>
    </div>
          <select class="form-control float-right col-lg-2 crx2" v-on:change="filter($event)">
            
            <option selected>Location</option>
            <option>Lahore</option>
            <option>Sialkot</option>
      </select>
      <br>
        <div
          class="card mt-5 col-12 col-lg-6 crx"
          v-for="dax in dx"
          v-bind:key="dax._id"
        >
          <div class="card-body">
             <p class="card-text mt-3 text-muted">
              <b-avatar class="mr-3"></b-avatar>
            <i>created by</i> -- {{ dax.threadOwnerName }}
            </p>
            <h5 class="card-title text-danger" v-if="dax.status==1">Status : On</h5>
            <h5 class="card-title text-danger" v-if="dax.status==0">Status : In process</h5>
            <h6
              class="card-subtitle mb-2"
              style="text-transform: uppercase;"
            >
              <fa-icon
                :icon="['fa', 'map-marker-alt']"
                size="xs"
              />
              {{dax.location}}
             
            </h6>
            <p class="d-none"> {{ dax.docId.includes(gmx) ? btncheck=true : btncheck=false }}</p>
            <hr>
            <p class="card-text mt-3 text-dark">
              {{ dax.desc }}
            </p>

            <p class="card-text mt-3 text-mute">
              Uploaded at:  {{ dax.date }}
            </p>
            
           
                     
            <b-button :disabled="btncheck" class="float-right col-12 col-lg-12 mt-5" v-if="show && btncheck" variant="success">Thread has been pitched</b-button>
           
            <b-button 
            :disabled="btncheck" 
            class="float-right col-12 col-lg-12 mt-5" 
            v-on:click="pitch(dax._id)" 
            v-if="show && btncheck==false" 
            id="show-btn"
            >
            Pitch
            </b-button>

            <button v-if="show" v-on:click="read(dax.threadOwner+' '+dax.threadOwnerName)" style="backgroundColor:#056162"  class="btn btn-info col-12 col-lg-12 mt-4">Contact</button>
            
            
          </div>
        </div>
      </div>

      


      <br /><br /><br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/threads/`,
});
export default {
  name: "Threads",
  data() {
    return {
      gmx : sessionStorage.getItem("did"),
      btncheck:false,
      dx: "",
      cnt: "",
      proposal:"",
      pitchMsg : 'Pitch thread',
      situation:'',
      t_id:'',
      desc: "",
      msg: "",
      loc: "",
      msgBool: false,
      error : "",
      log:"",
      visible : true,
      show : true,
      loader : false
    };
  },

  methods: {
    read(e){
      if(!sessionStorage.getItem("did")){
        alert("Please login as a Doctor");
        window.location.href="/Register/1"
      }
      else{
        var str = e;
        var res = str.split(" ");
        window.location.href=`/Chat/${res[0]}/${res[1]}`
      }
    },


    //post threads
    async submit() {
      if(this.desc==""||this.loc==""){
        this.error="All fields are required";
      }else{
        //  if user is not logged in
        if (!sessionStorage.getItem("Pid")) {
          alert("Please login as a Patient")
          window.location.href = "/Register/2"
        } else {
          const data = {
            desc: this.desc,
            location: this.loc,
            owner : sessionStorage.getItem("Pid"),
            ownerName : sessionStorage.getItem("Pname")
          };
          await api.post("/add", data).then((res) => {
            if (res.data == 1) {
              this.msg = "Post sucessfully uploaded";
              this.msgBool = true;
              window.location.href = "/threads";
            } else {
              this.msg = "Something went wrong";
              this.msgBool = true;
            }
          });
        }
      }
    },
    //filter location
    filter(e){
      api.get(`/filter/${e.target.value}`).then((res)=>{
        this.dx = res.data.gx
      })
    },
    //getting dropdown value
    locX(e){
      this.loc = e.target.value;
    },
    hideModal() {
        this.$refs['my-modal'].hide();
        const data = {
        Doc_id : sessionStorage.getItem("did"),
        thread_id : this.t_id,
        proposal : this.proposal
      };
      api.post('/pitch',data).then((res) => {
        //if thread is updated request posts again
        if(res.data.gx.n==1){
          this.getPosts();
        }
      });
    },
    pitch(e){
      if(!sessionStorage.getItem("did")){
        alert("Please login as a Doctor");
        window.location.href="/Register/1"
      }else{
        this.t_id = e;
        this.$refs['my-modal'].show();
      }
    },
   

    //  Pagination
    next() {
      let id = localStorage.getItem("counter");
      let num = parseInt(id);
      if (num <= this.cnt) {
        let newNum = num + 3;
        localStorage.setItem("counter", newNum);
        let fv = localStorage.getItem("counter");
        api.get(`/next/${fv}`).then((res) => {
          this.dx = res.data.gx;
        });
      } else {
        alert("not possible");
      }
    },

    //  Get threads
    getPosts() {
      api.get("/").then((res) => {
        if(res.data.gx[0].status=="1"){
          this.situation="On";
        }
        this.dx = res.data.gx;
      });
      api.get("/count").then((res) => {
        this.cnt = res.data;
          this.loader = false;

      });
    
    },
  },
  created() {
    this.loader = true;
    if(sessionStorage.getItem("Pid")){
        this.show = false 
    }
    this.getPosts();
    localStorage.setItem("counter", 3);
    if(sessionStorage.getItem("did")){
      this.visible = false
    }
  },
};
</script>

<style scoped>
.crx {
  transition: 0.5s;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.crx2 {
  border:1px solid grey;
  border-radius: 5px;

  background-color:#ffffff;
}
.crx:hover {
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
.text{
 position: absolute;
  bottom: 8px;
  left: 16px;
}
.con{
  position: relative;
  text-align: center;
  color: white;
}

.loader{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif') 
              50% 50% no-repeat rgb(249,249,249);
}
</style>
