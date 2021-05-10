<template>
    <div class="nbx">
  <b-navbar toggleable="lg" class="navbar navbar-dark fixed-top" style="background-color:#056162">
          
    <b-navbar-brand href="/" style="color:white">
    <img src="../assets/log.jpg" width="50px" style="height:50px; borderRadius:30px;" >
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-on:click="greet">Threads</b-nav-item>
        
        <b-nav-item href="/DocCats/All">Doctors</b-nav-item>
        <b-nav-item-dropdown text="Categories">
          <b-dropdown-item v-on:click="redirec(1)">General Physician</b-dropdown-item>
          <b-dropdown-item v-on:click="redirec(2)">Eye Specialist</b-dropdown-item>
          <b-dropdown-item v-on:click="redirec(3)">Gynecologist</b-dropdown-item>
          <b-dropdown-item v-on:click="redirec(4)">Child Specialist</b-dropdown-item>
          <b-dropdown-item v-on:click="redirec(5)">ENT Specialist</b-dropdown-item>
        </b-nav-item-dropdown>
       

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown right>

          
          <template #button-content >
            <em href="#" v-if="loggedIn==false"><fa-icon :icon="['fa','sign-in-alt']"/> Signup</em>
            <em  v-if="loggedIn">{{logName}}</em>
          </template>
          <!-- If user is logged in -->
          <b-dropdown-item v-on:click="open()" v-if="loggedIn">Profile</b-dropdown-item>
          <b-dropdown-item href="/Inbox" v-if="loggedIn">Inbox</b-dropdown-item>
          <b-dropdown-item href="#" v-if="loggedIn" v-on:click="logout">Log out</b-dropdown-item>
          <!-- If user is not logged in -->
          <b-dropdown-item href="/Register/1" v-if="loggedIn==false">As a doctor</b-dropdown-item>
          <b-dropdown-item href="/Register/2" v-if="loggedIn==false">As a patient</b-dropdown-item>


        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>

export default {
    name : 'Nav',

    data(){
        return{
            loggedIn:'',
            logName : ''
        }   
    },
    methods : {
      redirect(e){
      this.$router.push(`/DocCats/${e}`); 
    },
        greet(){
            this.$router.push('/threads'); 
        },
        open(){
          if(sessionStorage.getItem("did")){
            this.$router.push('/Dhome'); 
          }
          else if(sessionStorage.getItem("Pid")){
            this.$router.push('/Phome'); 
          }
        },
        logout(){
          sessionStorage.clear();
          window.location.reload();

        }
    },
    created(){
      if(!sessionStorage.getItem('Pid') && !sessionStorage.getItem('did') ){ 
        this.loggedIn = false;
      }
      if(sessionStorage.getItem('Pid')){
        this.loggedIn = true;
        this.logName = sessionStorage.getItem('Pname')
      }
      if(sessionStorage.getItem('did')){
        this.loggedIn = true;
        this.logName = sessionStorage.getItem('dname')
      }
      
    }
    
}
</script>
