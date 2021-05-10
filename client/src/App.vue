<template>
  <div id="app">
    <Nav/>
    <br><br>
    <div class="main-div">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'




export default {
  name: 'App',
  components: {
    Nav,
 
  },
  data(){
    return{
      todos: [
        {id:1,title:"Todo One",completed:false},
        {id:2,title:"Todo two",completed:true},
        {id:3,title:"Todo three",completed:false}
      ]
    }
  }
 
}
</script>

<style>



</style>
