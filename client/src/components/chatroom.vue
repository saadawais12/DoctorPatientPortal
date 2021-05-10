<template>
  <div>
    
    <div
      class="container jumbotron mt-5 col-lg-6 col-12"
      style="background-color: #2a2f32; border: 1px solid lightgrey"
    
    >
      <h3 class="text-light row justify-content-between">
        <div class="justify-content-start">
          <b-avatar class="ml-3"></b-avatar> {{ name }}
        </div>
        
        
        <fa-icon :icon="['fa', 'video']" size="1x" color="#056162" v-on:click="start" />
      </h3>
      <hr class="bg-light" />
      <div class="container jumbotron jbx col-lg-10 col-12" id="scroll">
        <div class="container">
          <b-list-group
            v-for="message in messages"
            v-bind:key="message._id"
            class="scroll"
          >
            <div v-if="message.msgFrom == dch">
              <b-list-group-item class="me float-right">
                {{ message.msg }}
              </b-list-group-item>
            </div>

            <div v-if="message.msgFrom != dch">
              <b-list-group-item class="him">
                {{ message.msg }}
              </b-list-group-item>
            </div>
            <br />
          </b-list-group>
        </div>
      </div>

      <form class="row justify-content-center" v-on:submit="sendMessage">
        <input
          type="text"
          class="form-control col-10 col-lg-9 inx mt-2"
          v-model="msg"
        />
        <button
          class="btn col-lg-1 col-2"
          style="background-color: #2a2f32"
          v-on:click="sendMessage"
          v-bind:disabled="!msg"
        >
          <fa-icon :icon="['fa', 'paper-plane']" size="2x" color="#056162" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "chatroom",
  props: ["messages", "name"],
  data: function () {
    return {
      msg: "",
      pch: "",
      dch: "",
    };
  },
  methods: {

    start(){
      window.location.href="/Video"
    },
      
    sendMessage: function () {
      if (!this.msg) {
        alert("Please enter a message");
        return;
      }

      this.$emit("sendMessage", this.msg);
      this.msg = "";
      this.scroll()
    },
    scroll() {
      var con = document.getElementById("scroll");
      var sh = con.scrollHeight;
      con.scrollTop = sh;
    },
  },


  mounted() {
    if (sessionStorage.getItem("did")) {
      this.dch = sessionStorage.getItem("did");
    }
    if (sessionStorage.getItem("Pid")) {
      this.dch = sessionStorage.getItem("Pid");
    }

   
    this.scroll();
  },
};
</script>

<style scoped>
.me {
  word-wrap: break-word;
  max-width:200px;
  border-radius: 30px;
  background-color: #056162;
  color: aliceblue;
}
.him {
  word-wrap: break-word;
  max-width:200px;
  border-radius: 30px;
  background-color: #262d31;
  color: white;
}
.btx {
  height: 35px !important;
}
.jbx {
  background-color: #0d1418;
  border: 1px solid darkslategray;
  overflow-y: scroll;
  height: 400px;
  
}
.inx {
  background-color: #efefef;
  border: 0.7px solid #33383b;
  color: #2a2f32;
  border-radius: 20px;
}


</style>
