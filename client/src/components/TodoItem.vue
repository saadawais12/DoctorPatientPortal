<template>
    <div class="mt-5">
        <div class="todo-item container" v-bind:class="{'is-completed':todo.completed}">
            <p> <input type="checkbox" v-on:change="markComplete"> {{todo.title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name : "TodoItem",
    props:["todo"],
    methods:{
        markComplete(){
            this.todo.completed = !this.todo.completed
        }
    }
}
</script>

<style scoped>
    .todo-item{
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
    .is-completed{
        text-decoration: line-through;
    }
    .del{
        background: red;
        color: #fff;
        border:none;
        cursor : pointer;
        float:right;
        padding: 5px 9px;
        border-radius: 50%;
    }

</style>