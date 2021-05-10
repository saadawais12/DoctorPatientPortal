<template>
<div class="container  jbx ">
  <h2 style="color: #333333" class="mt-5"><fa-icon :icon="['fa', 'home']" size="1x" color="#333333" /> My Panel</h2>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mt-4">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ CurrentUser }}</li>
          <li class="breadcrumb-item active" aria-current="page" v-if="length!=0">Total posts {{ length }}</li>
        </ol>
      </nav>
      <br><br><br>
      <div class="container" v-if="length==0">
        <h2 >No post yet !</h2>
        <br/>
        <a class="btn btn-info" href="/threads">Post new thread</a>
      </div>


      <div class="container" v-if="length!=0">
        <h2 >Total post(s) {{ length }}</h2>
      </div>
      <br>
      <hr>

        <div
          class="card mt-5 col-12 col-lg-6 crx"
          v-for="post in Newposts"
          v-bind:key="post._id"
        >
        

          <div class="card-body">
            <h5 class="card-title" v-if="post.status==0"><a v-bind:href="'/Pitch/'+ post._id" style="color:green">Doctor(s) pitched your post</a></h5>
            <h5 class="card-title" v-if="post.status==1">No one pitched your thread</h5>
            <hr>
            <h6
              class="card-subtitle mb-2 text-muted"
              style="text-transform: uppercase;"
            >
              <fa-icon
                :icon="['fa', 'map-marker-alt']"
                color="orange"
                size="xs"
              />
              {{ post.location }}
            </h6>
            <p class="card-text crx1">
              {{ post.desc }}
             
            </p>
           

              <button
              class="card-link float-right  btn btn-light btn-lg"
              style="color:white"
              v-if="show"
              v-on:click="del(post._id)"

              ><fa-icon :icon="['fa', 'trash']" size="1x" color="red" /></button>
            
          </div>
        </div>
        <br>
      </div>

    
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/threads/`,
});
export default {
    name : "Phome",
    data(){
        return{
            Newposts:"",
            show:true,
            pitchMsg : 'Not ptched yet',
            CurrentUser : sessionStorage.getItem("Pname"),
            length : ""
        }
    },
    methods:{
      del(e){
        api.delete(`/del/${e}`).then(() => {
          window.location.reload();
      });
      }
    },
    created(){
        let id = sessionStorage.getItem('Pid');
        if(!sessionStorage.getItem('Pid')){
          window.location.href="/"
        }
        api.get(`/each_patient/${id}`).then((res) => {
          this.Newposts = res.data.gx
          if(res.data.gx.length==0){
            this.length=0
          }else{
            this.length = res.data.gx.length
          }
      });
    }

}
</script>


<style scoped>
.crx {
  transition: 0.5s;
  border-radius: 15px;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
}
.crx:hover {
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}

</style>