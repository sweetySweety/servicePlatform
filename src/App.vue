<template>
  <div id="app">
       <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0;
  height: 100%;
}
.ant-layout{
  min-height: 100%;
}
.ant-tabs-bar{
  margin-bottom: 0;
}
.ant-tabs-tabpane-active{
  background: rgb(255, 255, 255);
    padding: 24px;
    margin: 0px;
    min-height: 280px;
    border: #e8e8e8 1px solid;
    border-top:none;
}
</style>
