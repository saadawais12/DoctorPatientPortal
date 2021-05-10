<template>
  <div>
    <div class="container">
      
      <!-- Doc register -->
      <div class="col-lg-7 col-12" v-if="uID == 1 && doc_log==true">
        <div
          class="jumbotron mt-5 container"
          style="background-color: #efefef"
        >
          <hr />
          <p v-if="uID == 1" class="txt">Doctor Register</p>
          <hr />
          

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Dr. John"
                v-model="nmx"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="*******"
                v-model="pwd"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="qual">Qualification</label>
              <input
                type="text"
                class="form-control"
                id="qual"
                placeholder="qualification"
                v-model="qualification"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Clinic Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              v-model="address"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="pmdc">PMDC Number</label>
              <input
                type="text"
                class="form-control"
                id="pmdc"
                placeholder="pmdc number.."
                v-model="pmdc_no"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">Specialization</label>
              <select
                id="inputState"
                class="form-control"
                v-model="specialization"
              >
                <option>General Physician</option>
                <option>Eye Specialist</option>
                <option>Gynecologist</option>
                <option>Child Specialist</option>
                <option>ENT Specialist</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="exp">Experience</label>
              <input
                type="text"
                class="form-control"
                id="exp"
                placeholder="2 years etc"
                v-model="experience"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="chrg">Charges</label>
              <input
                type="text"
                class="form-control"
                id="chrg"
                placeholder="1000 PKR"
                v-model="charges"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="desc"
            ></textarea>
          </div>
          <hr />
          <h4>Timings</h4>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity1">From</label>
              <input
                type="time"
                class="form-control"
                id="inputCity1"
                v-model="StartTime"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputCity">To</label>
              <input
                type="time"
                class="form-control"
                id="inputCity"
                v-model="EndTime"
              />
            </div>
          </div>
          <hr />

          <div class="alert alert-warning" role="alert" v-if="fill">
            {{ fill }}
          </div>
          <br />
          <h5>
            Already have an account?<span
              style="color: #056162; cursor: pointer"
              v-on:click="Dlog"
              > Login</span
            >
          </h5>
          <br /><br />

          <button class="btn btn-primary" style="background-color: #056162;" v-on:click="greet">
            Register
          </button>
        </div>
      </div>
      <!-- Doc register ends -->

      <!-- Doc login -->
      <div class="col-lg-7 col-12" v-if="uID == 1 && doc_log==false">
        <div
          class="jumbotron mt-5 container"
          style="background-color: #efefef"
        >
          <hr />
          <p v-if="uID == 1" class="txt">Doctor Login</p>
          <hr />

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                v-model="Demail"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="*******"
                v-model="Dpwd"
              />
            </div>
          </div>
          <hr />

          <div class="alert alert-warning" role="alert" v-if="fill">
            {{ fill }}
          </div>
          <br />
          <h5>
            Dont have an account?<span
              style="color: #056162; cursor: pointer"
              v-on:click="Dlog"
              > Register</span
            >
          </h5>
          <br /><br />

          <button class="btn btn-primary" style="background-color: #056162;" v-on:click="Dgreet">
            Login
          </button>
        </div>
      </div>
      <!-- Doc login ends -->



      <!-- Patient register -->
      <div class="col-lg-7 col-12" v-if="uID == 2 && user_log==true">
        <div
          class="jumbotron mt-5 container"
          style="background-color: #efefef"
        >
          <hr />
          <p v-if="uID == 2" class="txt">Patient Register</p>
          <hr />

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Full name"
                v-model="FName"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                v-model="UEmail"
                
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="*******"
                v-model="UPwd"
              />
            </div>
          </div>
          <br />
          <h5>
            Already have an account?<span
              style="color: #056162; cursor: pointer"
              v-on:click="Ulog"
              > Login</span
            >
          </h5>

          <hr />

          <div class="alert alert-warning" role="alert" v-if="fill">
            {{ fill }}
          </div>
          <br /><br />

          <button class="btn btn-primary" style="background-color: #056162;" v-on:click="USubmit">
            Register
          </button>
        </div>
      </div>


    <!-- Patient Login -->
    <div class="col-lg-7 col-12" v-if="uID == 2 && user_log==false">
        <div
          class="jumbotron mt-5  container"
          style="background-color: #efefef"
        >
          <hr />
          <p v-if="uID == 2" class="txt">Patient Login</p>
          <hr />

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                v-model="ULEmail"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="*******"
                v-model="ULPwd"
              />
            </div>
            
          </div>
          <br />
          <h5>
            Dont have an account?<span
              style="color: #056162; cursor: pointer"
              v-on:click="Ulog"
              > Register</span
            >
          </h5>

          <hr />

          <div class="alert alert-warning" role="alert" v-if="fill">
            {{ fill }} <div class="spinner-grow ml-5" style="width: 2rem; height: 2rem;" role="status" v-if="loader" />
           
          </div>
          <br /><br />
          

          <button class="btn btn-primary" style="background-color: #056162;" v-on:click="ULSubmit">
            Login
          </button>
        </div>
      </div>






    </div>
    
  </div>
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
});
export default {
  beforeCreate() {
    if (sessionStorage.getItem("Pid")) {
      window.location.href = "/";
    }
  },
  name: "Register",
  data() {
    return {
      loader : false,
      //conditional variables
      user_log: false,
      doc_log : false,

      //Doc login data
      Demail: "",
      Dpwd: "",


      //Doctor Register data
      fill: "",
      fillBool: false,
      uID: this.$route.params.id,
      nmx: "",
      email: "",
      pwd: "",
      qualification: "",
      pmdc_no: "",
      specialization: "",
      experience: "",
      address: "",
      charges: "",
      desc: "",
      StartTime: "",
      EndTime: "",

      //patient register data
      FName: "",
      UEmail: "",
      UPwd: "",

      //patient login data
      ULEmail:"",
      ULPwd:"",
    };
  },

  methods: {
    Ulog() {
      this.user_log = !this.user_log;
    },
    Dlog() {
      this.doc_log = !this.doc_log;
    },

    //doctor register api calling
    greet() {
      const data = {
        name: this.nmx,
        email: this.email,
        pwd: this.pwd,
        qualification: this.qualification,
        pmdc_no: this.pmdc_no,
        specialization: this.specialization,
        experience: this.experience,
        address: this.address,
        charges: this.charges,
        desc: this.desc,
        StartTime: this.StartTime,
        EndTime: this.EndTime,
      };
      if (
        this.nmx == "" || this.email == "" || this.pwd == "" || this.qualification == "" || this.pmdc_no == "" || this.specialization == "" ||
        this.experience == "" || this.address == "" || this.charges == "" || this.desc == "" || this.StartTime == "" || this.EndTime == ""
      ) {
        this.fill = "Please fill all fields.";
        this.fillBool = true;
      } else {
        api.post("/docs/add", data).then((res) => {
          sessionStorage.setItem("did", res.data.id);
          sessionStorage.setItem("dname", res.data.name);
          window.location.href = "/";
        });
      }
    },

    //patient register api calling
    USubmit() {
      const data = {
        name: this.FName,
        email: this.UEmail,
        pwd: this.UPwd,
      };
      if (this.FName == "" || this.UEmail == "" || this.UPwd == "") {
        this.fill = "Please fill all fields.";
        this.fillBool = true;
      } else {
        api.post("/patients/add", data).then((res) => {
          if (res.data == "0") {
            this.fill = "User already registered";
            this.fillBool = true;
          } else {
            sessionStorage.setItem("Pid", res.data._id);
            sessionStorage.setItem("Pname", res.data.name);
            window.location.href = "/threads";
          }
        });
      }
    },

    //patient login api calling
    ULSubmit() {
      this.loader = true
      const data = {
        email: this.ULEmail,
        pwd: this.ULPwd,
      };
      if (this.ULEmail == "" || this.ULPwd == "") {
        this.fill = "Please fill all fields.";
        this.fillBool = true;
      } else {
        api.post("/patients/login", data).then((res) => {
          if (res.data == "0") {
            this.fill = "Wrong credentials entered";
            this.fillBool = true;
            this.loader = false
          } else {
            this.loader = false
            sessionStorage.setItem("Pid", res.data._id);
            sessionStorage.setItem("Pname", res.data.name);
            window.location.href = "/threads";
          }
        });
      }
    },
    

    //doc login api calling
    Dgreet() {
      const data = {
        email: this.Demail,
        pwd: this.Dpwd,
      };
      if (this.Demail == "" || this.Dpwd == "") {
        this.fill = "Please fill all fields.";
        this.fillBool = true;
      } else {
        api.post("/docs/login", data).then((res) => {
          if (res.data == "0") {
            this.fill = "Wrong credentials entered";
            this.fillBool = true;
          } else {
            sessionStorage.setItem("did", res.data._id);
            sessionStorage.setItem("dname", res.data.name);
            window.location.href = "/threads";
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.txt {
  font-size: 30px;
}
</style>