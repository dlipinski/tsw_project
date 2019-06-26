import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Panel from '@/components/Panel'
import Clas from '@/components/Clas'
import Judges from '@/components/Judges'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                block: true
            }
        },
        {
            path: '/',
            name: 'Panel',
            component: Panel
        },
        {
            path: '/class/:id',
            name: 'Clas',
            component: Clas,
            props: true
        },
        {
            path: '/judges',
            name: 'Judges',
            component: Judges,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user') === null || localStorage.getItem('user') === 'false') {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
