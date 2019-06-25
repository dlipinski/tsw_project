<template>
<div class='container pt-5 w-50'>
    <b-table striped hover :items='classes' :fields='fields'>
    </b-table>
    <b-button-group class='m-auto'>
        <b-button  @click='previous'>previous</b-button>
        <b-button @click='next'>next</b-button>
    </b-button-group>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Panel',
    mounted: function () {
        this.getClasses(1)
    },
    data () {
        return {
            classes: [],
            n: 1,
            isPrevious: false,
            fields: ['category']
        }
    },
    methods: {
        getClasses: function (n) {
            var self = this
            axios
                .get(`/api/classes/${n}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    self.classes = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        previous: function () {
            if (this.n > 1) {
                this.n--
                this.getClasses(this.n)
            }
        },
        next: function () {
            if (this.classes.length === 10) {
                this.n++
                this.getClasses(this.n)
            }
        }
    }
}
</script>
