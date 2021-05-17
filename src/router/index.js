import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ReCommend',
    component: () => import('../views/ReCommend.vue'),
    meta:{navShow:true}
  },
  {
    path:'/hotsong',
    name:'Hotsong',
    component:()=>import('../views/Hotsong.vue'),
    meta:{navShow:true}
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search.vue'),
    meta:{navShow:true}
  },
  {
    path:'/gedan',
    name:'Gedan',
    component:()=>import('../views/Gedan_square.vue'),
    meta:{navShow:true}
  },
  {
    path:'/gedanDT/:id',
    name:'GedanDT',
    props:true,
    component:() => import('../views/Gedan_detail.vue'),
    meta:{navShow:false}
  }
]
const router = new VueRouter({
  model:'hash',
  routes
})

export default router
