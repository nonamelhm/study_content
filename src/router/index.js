import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/flv',
        name: 'Flv',
        component: () =>
            import ( '../components/Flv.vue')
    },
   {
       path: '/xgPlayer',
       name: 'XgPlayer',
       component: () =>
           import ( '../components/XgPlayer.vue')
   },
   {
       path: '/dragFlv',
       name: 'DragFlv',
       component: () =>
           import ( '../components/DragFlv.vue')
   },
    {
        path: '/hotmap',
        name: 'HotMap',
        component: () =>
            import ( '../components/HotMap.vue')
    },
    {
        path: '/progress',
        name: 'Progress',
        component: () =>
            import ( '../components/Progress.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
