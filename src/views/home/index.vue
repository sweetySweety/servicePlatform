<template>
  <div class='home'>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted () {},
  methods: {}
}
</script>

<style scoped lang='scss'>
.home {
//height: 100%;
//min-height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
