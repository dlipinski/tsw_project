<template>
<div class='container pt-5'>
    <b-card header='Obecna klasa'>
        <div class='text-center'>
            <small class='text-muted'>Obecnie nie odbywają się żadne klasy</small>
        </div>
    </b-card>
    <b-card header='Ukończone klasy' class='mt-5'>
        <b-card-group deck>
            <b-card v-bind:key='clas._id' v-for='clas in classes'>
                <small><strong>Zwycięzca:</strong> {{ clas.horses[0].name }}</small><br>
                <small><strong>Kategoria:</strong> {{ clas.category }}</small><br>
                <small><strong>Konie:</strong> {{ clas.horses.length }}</small><br>
                <small><strong>Sędziowie:</strong> {{ clas.judges.length }}</small><br>
                <small><strong>Data:</strong> {{ clas.createdAt | formatDate}}</small><br>
                <b-link v-bind:to="'/class/'+clas._id">Zobacz</b-link>
            </b-card>
        </b-card-group>
        <div class='text-center mt-3'>
            <b-button-group>
                <b-button  @click='previous' v-if='n > 1'>&lt;</b-button>
                <b-button @click='next' v-if='classes.length === 3'>&gt;</b-button>
            </b-button-group>
        </div>
    </b-card>
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
        getLink: function (id) {
            return `/clas/${id}`
        },
        getClasses: function (n) {
            axios
                .get(`/api/classesClient/${n}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    this.classes = response.data
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
            if (this.classes.length === 3) {
                this.n++
                this.getClasses(this.n)
            }
        }
    }
}
</script>
