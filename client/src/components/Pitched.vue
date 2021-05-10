<template>
  <div class="container">
      
      <ul class="list-group mt-5" v-if="len">
  <li class="list-group-item d-flex justify-content-between align-items-center">
     Doctors pitched my thread
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
          <td>Specialization</td>
          <td>Experience</td>
          <td>Address</td>
          <td>Timings</td>
          <td>Proposal</td>
          <td>Action</td>
        </tr>
      </thead>

      <tbody v-for="(dax, i) in newDx" v-bind:key="dax._id">
        <tr class="text-light">
          <td>{{ i + 1 }}</td>
          <td>{{ dax.name }}</td>
          <td>{{ dax.specialization }}</td>
          <td>{{ dax.experience }}</td>
          <td>{{ dax.address }}</td>
          <td>{{ dax.StartTime }} to {{ dax.EndTime }}</td>
          <td>{{ arr[0][i] }}</td>
          <td>
            <button
              v-on:click="read(dax._id + ' ' + dax.name)"
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
  name: "Pitched",

  data() {
    return {
      dx: [],
      uID: this.$route.params.id,
      arr: [],
      newDx: [],
      proposal: "",
      cnt: "",
      len: ""
    };
  },
  methods: {
    read(e) {
      var str = e;
      var res = str.split(" ");
      this.$router.push(`/Chat/${res[0]}/${res[1]}`);
    },
  },
  created() {
    //get doc id's who pitched my thread
    const data = {
      tid: this.uID,
      id: sessionStorage.getItem("Pid"),
    };

    api.post("/threads/getDocs", data).then((res) => {
      this.dx = res.data;
      this.dx.map((s) => this.arr.push(s.docProposal));
      this.dx.map((a) =>
        api.get(`/docs/getDocName/${a.docId}`).then((res) => {
          this.newDx = res.data;
          this.len = res.data.length
        })
      );
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