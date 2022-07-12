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
        path: '/tree',
        name: 'Tree',
        component: () =>
            import ( '../components/Tree.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
