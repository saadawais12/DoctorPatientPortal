<template>
  <div class="container">
    <nav aria-label="breadcrumb" class="mt-5 container">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Chat</li>
        <li class="breadcrumb-item active" aria-current="page">
          Dr. {{ name }}
        </li>
      </ol>
    </nav>
    <div class="container jumbotron jbx mt-5">
      <div class="container mt-5">
        <b-list-group v-for="message in messages" v-bind:key="message._id">
          <div v-for="item in message.msg" :key="item.msg">
            <div v-if="message.msgFrom == dch" class="me float-right mt-3 p-3">
              {{ item }}
            </div>

            <div v-if="message.msgFrom != dch">
              <b-list-group-item class="him mt-3">
                {{ item }}
              </b-list-group-item>
            </div>
          </div>
        </b-list-group>
        <br /><br />

        <form
          class="input-container row justify-content-center"
          v-on:submit="sendMessage"
        >
          <input
            type="text"
            class="form-control col-10 col-lg-4 inx"
            v-model="msg"
          />
          <button
            class="btn btn-danger col-lg-1 col-2"
            v-on:click="sendMessage"
            v-bind:disabled="!msg"
          >
            <fa-icon :icon="['fa', 'paper-plane']" size="1x" color="#fff" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatroom",
  props: ["messages", "name"],
  data: function() {
    return {
      msg: "",
      pch: "",
      dch: "",
    };
  },
  methods: {
    sendMessage: function() {
      if (!this.msg) {
        alert("Please enter a message");
        return;
      }
      this.$emit("sendMessage", this.msg);
      this.msg = "";
    },
  },
  created() {
    if (sessionStorage.getItem("did")) {
      this.dch = sessionStorage.getItem("did");
    }
    if (sessionStorage.getItem("Pid")) {
      this.dch = sessionStorage.getItem("Pid");
    }
  },
};
</script>

<style scoped>
.me {
  word-wrap: break-word;
  width: 250px;
  border-radius: 30px;
  background-color: whitesmoke;
}
.him {
  word-wrap: break-word;
  width: 250px;
  border-radius: 30px;
}
.btx {
  height: 35px !important;
}
.jbx {
  background-color: white;
  border: 1px solid lightgrey;
}
.inx {
  border: 0.7px solid black;
}
</style>
