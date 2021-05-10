<template>
  <div class="container">
      
      <ul class="list-group mt-5" >
  <li class="list-group-item d-flex justify-content-between align-items-center">
     Pitched threads
    <span class="badge badge-primary badge-pill">{{ len }}</span>
  </li>
  
</ul>
    <table
      class="table table-hover table-responsive-sm mt-5 col-12 col-lg-12"
      style="background-color: #333333"
    >
      <thead>
        <tr class="text-light" style="background-color: #056162">
          <td>#</td>
          <td>Name</td>

          <td>Address</td>
          <td>Status</td>
        <td>Thread Description</td>
        <td>My proposal</td>
          <td>Action</td>
        </tr>
      </thead>


      <tbody v-for="(dax, i) in dx" v-bind:key="dax._id">
        <tr class="text-light">
          <td>{{ i + 1 }}</td>
          <td>{{ dax.threadOwnerName }}</td>
          <td>{{ dax.location }}</td>  
          <td>{{ dax.status==0 && "On wait" }}</td>
          <td>{{ dax.desc }} </td>
          <td>{{ dax.docProposal[ dax.docId.indexOf(did)] }}</td>
          <td>
            <button
              v-on:click="read(dax._id + ' ' + dax.threadOwnerName)"
              class="btn"
              style="background-color: #333333"
            >
              <fa-icon :icon="['fa', 'phone']" size="1x" color="#fefefe" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
});
export default {
  name: "Dhome",

  data() {
    return {
      dx: [],
      uID: this.$route.params.id,
      arr: [],
      newDx: [],
      proposal: "",
      cnt: "",
      len: "",
      did : sessionStorage.getItem("did")
    };
  },
  methods: {
    read(e) {
      var str = e;
      var res = str.split(" ");
      window.location.href = `/Chat/${res[0]}/${res[1]}`;
    },
  },
  created() {

     let id =  sessionStorage.getItem("did");
 
    api.get(`/threads/each_doc/${id}`).then((res) => {
      this.dx = res.data.gx;
      this.len = res.data.gx.length;
      
    });
  },
};
</script>

<style scoped>
.crx1 {
  border: 1px solid #fff;
  background-color: #333333;
  color: blanchedalmond;
}
.crx {
  border: 1px solid #fff;
  background-color: #333333;
  color: blanchedalmond;
}
table th,
table td {
  padding: 30px !important; /* Apply cell padding */
}
</style>