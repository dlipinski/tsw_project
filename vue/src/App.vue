<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">APP</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/">Panel kibica</b-nav-item>
                    <b-nav-item to="/posts-manager">Posts Manager</b-nav-item>
                    <b-nav-item to="/login" >Login</b-nav-item>
                    <b-nav-item href="#"  @click="logout">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
          </b-navbar>
          <!-- routes will be rendered here -->
          <router-view />
      </div>
</template>

<script>
import router from './router'
import axios from 'axios'
export default {
    name: 'App',
    methods: {
        logout: (e) => {
            axios
                .get('/api/logout')
                .then(() => {
                    router.push('/')
                })
        }
    }
}
</script>

<style>
</style>
