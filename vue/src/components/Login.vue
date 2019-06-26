<template>
<div class='container pt-5 w-50'>
    <b-alert variant='danger' dismissible :show='showAlert'>
        Niepoprawne dane logowania. Spróbuj ponownie.
    </b-alert>
    <b-card header='Login' class='w-50 m-auto'>
        <b-form @submit='login'>
            <b-form-group id='input-group-username' label='Nazwa użytkownika:' label-for='username'>
                <b-form-input id='username' required placeholder='Wprowadź nazwę użytkownika'></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-password' label='Hasło:' label-for='password'>
                <b-form-input id='password' type='password' required placeholder='Wprowadź hasło'></b-form-input>
            </b-form-group>
            <b-button block type="submit" variant="primary">Login</b-button>
        </b-form>
    </b-card>
</div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
    data () {
        return {
            showAlert: false
        }
    },
    methods: {
        login: function (e) {
            e.preventDefault()
            let login = () => {
                let data = {
                    username: e.target.elements.username.value,
                    password: e.target.elements.password.value
                }
                axios.post('/api/login', data)
                    .then((response) => {
                        localStorage.setItem('user', true)
                        router.push('/')
                    })
                    .catch((errors) => {
                        this.showAlert = true
                        console.log(errors)
                    })
            }
            login()
        }
    }
}
</script>
