<template>
  <div>
    <nav aria-label="breadcrumb" class="mt-5 container">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page" v-if="length != 0">{{ length }} doctors found</li>
    <li class="breadcrumb-item active" aria-current="page" v-if="length == 0">No doc found</li>
  </ol>
</nav>

    <br>
    <div class="loader" v-if="loader"></div>


    <div class="column container">
      <div class="row justify-content-between">
      <h3 class="col-12 col-lg-6"> {{ type }}</h3>
      <select class="form-control ml-3 col-lg-2 col-6" v-on:change="filter($event)">
            
            <option value="0" selected>Filter</option>
            <option value="1">Fee : High to low</option>
            <option value="2">Fee : Low to high</option>
      </select>
      </div>
      <br><hr>
      <br>
      <div class="card mb-5 crx"  v-for="dax in CatData" v-bind:key="dax.id">
        <div class="card-header text-light" style="background-color:#056162">
          <h2><b-avatar class="ml-3"></b-avatar> Dr {{ dax.name }}</h2>
          <p class="ml-3">Rs {{ dax.charges }}-/</p>
          <h6 class="ml-3">{{ dax.specialization }}</h6>
          
        </div>
        <div class="card-body text-light " style="background-color:#333333">
          <h5 class="card-title"></h5>
          <div class="row justify-content-between ">
            <div class="col-lg-2 col-12">
              <h3 class="text-info">Experience</h3>
               <p>{{ dax.experience }}</p>  
            </div>
            <div class="col-lg-2 col-12">
              <h3 class="text-info">PMDC No</h3>
              <p>{{ dax.pmdc_no }}</p>   
            </div>
            <div class="col-lg-2 col-12">
              <h3 class="text-info">Address</h3>
              <p>{{ dax.address }}</p>  
            </div>
            <div class="col-lg-2 col-12">
              <h3 class="text-info">Timings</h3>
               <p>{{ dax.StartTime }} - {{ dax.EndTime }}</p>  
            </div>
            

          </div>
   
          
        
          <h5 class="text-info mt-3">Description</h5>
           <p class="">{{ dax.desc }} </p>
        
          <button v-if="who" v-on:click="open(dax._id+' '+dax.name)" class="btn btn-dark float-right"><fa-icon :icon="['fa', 'envelope']" size="1x" color="#fff" /> </button>
        </div>
      </div>

  
    </div>
  </div>
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/docs/`,
});
export default {
  name: "DocCats",
  data() {
    return {
      Did: this.$route.params.id,
      CatData: "",
      length: "",
      type:"",
      who:'',
      loader : true
    };
  },
  methods:{
    open(e){
      if(sessionStorage.getItem("did")){
        alert("Only patients can contact to doctors")
        return
      }
      else if(!sessionStorage.getItem("Pid")){
        alert("Please login before contacting")
        window.location.href="/Register/2"
      }
      else{
        var str = e;
        var res = str.split(" ");
        window.location.href=`/Chat/${res[0]}/${res[1]}`
      }

    },
    //filter price
    filter(e){
      
      if(e.target.value==0){
        return
      }else{
        const id = this.type;
        api.get(`/fee/${id}/${e.target.value}`).then((res)=>{
          console.log(res.data)
          this.CatData = res.data;
        })
      }
      
    },
  },

  created() {
    if(sessionStorage.getItem("did")){
      this.who = false
    }else{this.who = true}
    const id = this.Did;
    if(id=="All"){
      this.type="All doctors"
        api.get("/").then((res) => {
        this.CatData = res.data;
        this.loader = false
        if (res.data.length > 0) {
          this.length = res.data.length;
        } else {
          this.length = "No doctor found";
        }
      });
    }else{
      if(id==1){this.type="General Physician"}
      if(id==2){this.type="Eye Specialist"}
      if(id==3){this.type="Gynecologist"}
      if(id==4){this.type="Child Specialist"}
      if(id==5){this.type="ENT Specialist"}


      api.get(`/docCat/${this.type}`).then((res) => {
        this.CatData = res.data;
        
        if (res.data.length > 0) {
          this.length = res.data.length;
          this.loader = false
        } else {
          this.length = "No doctor found";
        }
      });

    }
    
  },
};
</script>

<style scoped>
.crx{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
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