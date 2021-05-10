<template>
    <div>
        <div
          class="card mt-5 col-12 col-lg-6 crx"
          v-for="dax in dx"
          v-bind:key="dax._id"
        >
        <h2>{{ dax.docId }}</h2>

        
        </div>
    </div>
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/threads/`,
});
export default {
    name : "Alldocs",
    data(){
        return{
            dx : [],
        }
    },
    created(){
        //get doc id's who pitched my thread
        let id = sessionStorage.getItem('Pid');
        api.get(`/getDocs/${id}`).then((res) => {
            this.dx = res.data;
        });
    }
}
</script>