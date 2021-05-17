<template>
  <div id="app">
    <TopNav v-show="$route.meta.navShow"></TopNav>
    <router-view />
    <Play :playdata = "$root.playingMusic.musicId"></Play>
    
  </div>
  
</template>

<script>
import TopNav from "./components/TopNav";
import Play from "./components/Play.vue"
export default {
  components: {
    TopNav,
    Play
  },
  data(){
    return {
      playdata:this.$root.playingMusic.musicId
    }
  },
};
</script>

<style>
#app {
  padding-bottom: 28px;
  overflow-y: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
