<template>
  <div>
    <div class="d-flex align-items-center jbx">
      <div class="col-lg-4 d-none d-lg-block">
        <h2 class="fntx">
          <fa-icon :icon="['fa', 'user-md']" size="4x" color="#fff" />
        </h2>
        <br />
        <h3 style="text-align: center; color: white">Find doctors</h3>
      </div>

      <div class="col-lg-6">
        <h2 class="fntx">Find and book the best doctors near you</h2>
        <br />
        <div class="jbx5">
          <select id="inputState" class="form-control x1" v-on:change="locX($event)">
            <option selected>Category</option>
            <option>ENT Specialist</option>
            <option>General Physician</option>
            <option>Eye Specialist</option>
            <option>Gynecologist</option>
            <option>Child Specialist</option>
            
          </select>

          <input
            type="text"
            placeholder="Search for Doctors, Hospital and Services.."
            class="form-control x2"
            v-model="searchX"
          />
        </div>
        <br />
        <button class="btn btn-dark btn-block " v-on:click="gtx" style="color:#fff">
          <fa-icon :icon="['fa', 'search']" /> Search
        </button>

      </div>
    </div>

    

    <div class="Mcrx jumbotron">
      <h3 style="text-align: center">Find doctors by health concern</h3>
      <div class="row justify-content-around mt-5 col-lg-12">
        <a href="/DocCats/1" class="link">
          <div class="card text-white mb-3 crx col-12" style="max-width: 15rem">
            <div class="card-body">
              <h5 class="card-title text-dark">General Physician</h5>
              <p class="card-text srcx">
                <fa-icon :icon="['fa', 'user-md']" size="4x" color="#056162" />
              </p>
            </div>
          </div>
        </a>

        <a href="/DocCats/2" class="link">
          <div class="card text-white mb-3 crx col-12" style="max-width: 15rem">
            <div class="card-body">
              <h5 class="card-title text-dark container">Eye Specialist</h5>
              <p class="card-text srcx">
                <fa-icon :icon="['fa', 'eye']" size="4x" color="#056162" />
              </p>
            </div>
          </div>
        </a>

        <a href="/DocCats/3" class="link">
          <div class="card text-white mb-3 crx col-12" style="max-width: 15rem">
            <div class="card-body">
              <h5 class="card-title text-dark container">Gynecologist</h5>
              <p class="card-text srcx">
                <fa-icon
                  :icon="['fa', 'heartbeat']"
                  size="4x"
                  color="#056162"
                />
              </p>
            </div>
          </div>
        </a>

        <a href="/DocCats/4" class="link">
          <div class="card text-white mb-3 crx col-12" style="max-width: 15rem">
            <div class="card-body">
              <h5 class="card-title text-dark container">Child care</h5>
              <p class="card-text srcx">
                <fa-icon :icon="['fa', 'baby']" size="4x" color="#056162" />
              </p>
            </div>
          </div>
        </a>

        <a href="/DocCats/5" class="link">
          <div class="card text-white mb-3 crx col-12" style="max-width: 15rem">
            <div class="card-body">
              <h5 class="card-title text-dark container">ENT Specialist</h5>
              <p class="card-text srcx">
                <fa-icon
                  :icon="['fa', 'head-side-cough']"
                  size="4x"
                  color="#056162"
                />
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>


    <br />

    <!-- Patient and doctor div -->
      <div class="div-box mb-5">
        <div class="shadow1">
        <a href="/DocCats/All" style="text-decoration:none">
        <div class="p-5">
          <h2 style="color:#056162">Doctors</h2>
          <div class="line"></div>
          <br/>
          <h3>You are at a right place in covid days.</h3>
          <h4>Doctors at on click away now!</h4>
          <button class="btn btn-success p-2 mt-3">Find doctors</button>
          <img src="../assets/doc.jpg" width="200px" >
        </div>
        </a>
      </div>
      <div class="shadow2">
        <a href="/threads" style="text-decoration:none">
        <div class="p-5">
          <h2 style="color:#056162">Patients</h2>
          <div class="line"></div>
          <br/>
          <div class="div-box">
            <div>
              <h4>Find Patients around the world and help them with your experience.</h4>
              <button class="btn btn-success p-2 mt-3">Find patients</button>
            </div>
                    <img src="../assets/patient.png" width="500px" class="img2" >
          </div>
          

        </div>
        </a>
      </div>
      </div>
      <!-- Patient and doctor div ends -->

    
  </div>
</template>

<script>

export default {
  name: "LandinPage",
  data() {
    return {
      loc : "null",
      searchX : ""
    };
  },

  methods: {
    locX(e){
      this.loc = e.target.value;
    },
   
    gtx() {
      if(this.searchX==""){
        this.searchX="null"
      }
      window.location.href = `/Searched/${this.loc}/${this.searchX}`
    },
  },
};
</script>

<style scoped>
.img2{
  margin-top: -40px;
}
.div-box{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.line{
  background-color: teal;
  width: 110px;
  height: 3px;
  margin-left: 8px;
}
.inp {
  width: 50%;
  height: 50px;
  border: 1px solid gray;
}
.jbx {
  background-color:#056162;
    height:50vh;
    border-bottom-left-radius:50%;
    border-bottom-right-radius:50%;
}
.fntx {
  color:#ffffff;
  text-align: center;
}
.slx {
  width: 30% !important;
  border: 1px solid gray;
}
.jbx2 {
  margin-top: 8%;
}
.crx {
  transition: 0.3s;
  border-radius: 15px;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
}
.crx:hover {
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
.Mcrx {
  background-color: #efefee !important;
}
.srcx {
  text-align: center;
}
.dvd1 {
  background-color: #333;
}
.shadow1{
  margin-left: 70px;
  height: 70vh;
  width: 30%;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.shadow2{
  margin-left: 70px;
  height: 52vh;
  width: 60%;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.dvd2 {
  background-color: #ffffff;
  
  height: 300px;
}
.h3x {
  text-align: center;
  color: white;
  margin-top: 40px;
}
.h6x {
  color: white;
  text-align: center;
  font-weight: unset;
}
.jbx5 {
  display: flex;
  justify-content: space-between;
}
.x1 {
  width: 39%;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.x2 {
  width: 59%;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.thrdx {
  padding: 2%;
}
.link{
  text-decoration: none;
}
</style>