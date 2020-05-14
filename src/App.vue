<template>
<div id="app">
  <transition name="moveInUp">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
name: 'App',
components: {}
}
</script>

<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
color: #2c3e50;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>