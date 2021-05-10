<template>
    <div >
        <chatroom  v-bind:name="this.$route.params.name"  v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
        
    </div>

</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/`,
});
import chatroom from './chatroom';
const io = require("socket.io-client");
const socket = io.connect("http://localhost:5000");


export default {
    name : "Chat",
    components:{chatroom},
    data(){
        return{
            Did: '',
            username : '',
            msgTo : '',
            messages : [],
            users : [],
            msgFrom : '',
            msgToName : this.$route.params.name
        }
    },
    methods:  {
      
        
        joinServer(){
            const u = this.username;
            const mt =this.msgTo;
            const mf = this.msgFrom;
            const mtn = this.msgToName
            socket.emit('join', {u , mt , mf , mtn});
            
            this.listen();
            
        },
        listen(){
           
            socket.on('msg',message=>{
                this.messages.push(message);
            })
        },
        sendMessage(message){
            socket.emit('msg',message);

        }

    },


    created(){
        //  redirect if not logged In
        if(!sessionStorage.getItem("Pname") && !sessionStorage.getItem("dname")){
            window.location.href="/"
        }

        
        //  If Patient is logged In
        if(sessionStorage.getItem("Pname")){
            const data = {
                MsgToId: this.$route.params.id,
                MsgFromId: sessionStorage.getItem("Pid")
            };
            
            api.post("/s",data).then((res)=>{
                
                this.messages = res.data;
            });
        }

        //  If doctor is logged In
        else if(sessionStorage.getItem("dname")){
            const data = {
                MsgToId: this.$route.params.id,
                MsgFromId: sessionStorage.getItem("did")
            };
            
            api.post("/d",data).then((res)=>{
                this.messages = res.data;
            });
        }
        
    },
    
    mounted(){
        
        if(sessionStorage.getItem("Pname")){
            this.username = sessionStorage.getItem("Pname");
            this.msgFrom = sessionStorage.getItem("Pid");
            this.msgTo = this.$route.params.id;
        }
        if(sessionStorage.getItem("dname")){
            this.username = sessionStorage.getItem("dname");
            this.msgFrom = sessionStorage.getItem("did");
            this.msgTo = this.$route.params.id;
        }
        this.joinServer();
    }
    
}
</script>


<style scoped>

</style>