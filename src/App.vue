<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/flv">flv直播</router-link>|
      <router-link to="/xgPlayer">flv西瓜直播</router-link>|
      <router-link to="/dragFlv">项目要求拖拽flv</router-link>|
      <router-link to="/hotmap">热力图</router-link>|
      <router-link to="/progress">进度条</router-link>|
      <router-link to="/map">地图</router-link>|
	  <router-link to="/flex">玩转flex布局</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    height: 900px;
    flex-direction: column;
  }

  #nav {
    padding: 30px;
    height:24px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
