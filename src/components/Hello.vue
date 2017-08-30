<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <div class='td-input-item'>
        <span class='input-title'>标题</span>
        <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTitle">
      </div>
      <div class='td-input-item'>
        <span class='input-title'>描述</span>
        <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="How to do it?"
        v-model="newDes">
      </div>
    </header>
  </section>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      newTitle: '',
      newDes: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todoapp {
    background: #fff;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.todoapp h1 {
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
}
.new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
.new-todo, .edit {
    position: relative;
    margin: 0 5%;
    font-size: 24px;
    min-width: 50%;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 10px;
}
.td-input-item{
    margin: 15px 0;
}

</style>
