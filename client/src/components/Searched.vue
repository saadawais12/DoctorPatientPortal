<template>
  <div>
    <nav aria-label="breadcrumb" class="mt-5 container">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page" v-if="length != 0">{{ length }} doctors found</li>
    <li class="breadcrumb-item active" aria-current="page" v-if="length == 0">{{ length }}</li>
  </ol>
</nav>


    <br><br><br>
    <div class="column container">
      <a href="/" class="btn btn-warning ">Go back</a>
      <br><br><br>
      <div class="card mb-5 "  v-for="dax in CatData" v-bind:key="dax.id"  >
        <div class="card-header text-light" style="background-color:#056162" >
          <h2>Dr {{ dax.name }}</h2>
          <p>Rs {{ dax.charges }}-/</p>
          <h6>{{ dax.specialization }}</h6>
          
        </div>
        <div class="card-body text-light" style="background-color:#333333">
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
  name: "Searched",
  data() {
    return {
      uID: this.$route.params.loc,
      uName: this.$route.params.name,
      CatData: "",
      length: "",
      who:'',
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
  },

  created() {
    if(sessionStorage.getItem("did")){
      this.who = false
    }else{this.who = true}
    const data = {
        loc : this.uID,
        search : this.uName
      }
    api.post('/filtsearch',data).then((res)=>{
      if(res.data==null){
console.log('x')
      }
        
        this.CatData = res.data
        if (res.data!=null) {
        this.length = res.data.length;
      } else {
        this.length = "No doctor found";
      }
           
      })
  },
};
</script>