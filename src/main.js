import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
let playingMusic = {
  musicId:0,
  isPlay:true
  // playingMusic:[]
}
let playerlistsss = [];
let ID = '';
// let player_Show = true;

new Vue({
  router,
  data:{
    playingMusic,
    playerlistsss,
    ID,
  },
  render: h => h(App)
}).$mount('#app')
