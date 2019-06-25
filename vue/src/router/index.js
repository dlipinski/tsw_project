import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Panel from '@/components/Panel'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Panel',
            component: Panel
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }
    ]
})
