<template>
<div class='container pt-4'>
    <div class='pb-3'>
        <b-button >Sędziowie</b-button>
        <b-button variant="outline-dark">Konie</b-button>
        <b-button variant="outline-dark">Klasy</b-button>
    </div>
    <b-row>
        <b-col>
            <b-table striped hover :items='judges' :fields='fields' outlined>
                <template slot="name" slot-scope="data">
                    <!-- `data.value` is the value after formatted by the Formatter -->
                    <a :href="`#${data.value.split(' ').join('-')}`" @click='setEditing(data.item._id)'>{{ data.value }}</a>
                </template>
            </b-table>
            <div class='text-center mt-3'>
                <b-button-group class='m-auto'>
                    <b-button  @click='previous' v-if='n > 1'>&lt;</b-button>
                    <b-button @click='next' v-if='judges.length === 10'>&gt;</b-button>
                </b-button-group>
            </div>
        </b-col>
        <b-col v-if='!editing'>
            <b-card header='Nowy sędzia'>
                <b-form @submit='newJudge'>
                <b-form-group id='input-group-name' label='Nazwa' label-for='name'>
                    <b-form-input id='name' required placeholder='Wprowadź nazwę sędzi'></b-form-input>
                </b-form-group>
                <b-form-group id='input-group-country' label='Kraj:' label-for='country'>
                    <b-form-input id='country' required placeholder='Wprowadź kraj:'></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Utwórz</b-button>
            </b-form>
            </b-card>
        </b-col>
        <b-col v-if='editing'>
            <b-card header='Edytuj sędziego'>
                <b-form @submit='editJudge'>
                <b-form-group id='input-group-name' label='Nazwa' label-for='name'>
                    <b-form-input id='name' required placeholder='Wprowadź nazwę sędzi' :value=judgeData.name></b-form-input>
                </b-form-group>
                <b-form-group id='input-group-country' label='Kraj:' label-for='country'>
                    <b-form-input id='country' required placeholder='Wprowadź kraj:' :value=judgeData.country></b-form-input>
                </b-form-group>
                <b-form-input id='id' required hidden :value=judgeData.id></b-form-input>
                <b-button type="submit" variant="primary">Zatwierdź</b-button>
                <b-button variant="outline-primary" @click='editing=false'>Anuluj</b-button>
                <b-button variant="danger" class='float-right' @click='removeJudge'>Usuń</b-button>
            </b-form>
            </b-card>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Panel',
    mounted: function () {
        this.getJudges(1)
    },
    data () {
        return {
            judges: [],
            n: 1,
            fields: ['name', 'country'],
            editing: false,
            judgeData: {
                id: '',
                name: '',
                country: ''
            }
        }
    },
    methods: {
        getJudges: function (n) {
            var self = this
            axios
                .get(`/api/judges/${n}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    self.judges = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        newJudge: function (e) {
            e.preventDefault()
            let data = {
                name: e.target.elements.name.value,
                country: e.target.elements.country.value,
                type: 'judge'
            }
            axios
                .post('/api/person', data)
                .then((response) => {
                    this.getJudges(this.n)
                    e.target.elements.name.value = ''
                    e.target.elements.country.value = ''
                })
                .catch((errors) => {
                    this.showAlert = true
                    console.log(errors)
                })
        },
        setEditing: function (id) {
            this.editing = true
            axios
                .get(`/api/person/${id}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    let data = response.data
                    this.judgeData.id = data._id
                    this.judgeData.name = data.name
                    this.judgeData.country = data.country
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editJudge: function (e) {
            e.preventDefault()
            let id = e.target.elements.id.value
            let data = {
                name: e.target.elements.name.value,
                country: e.target.elements.country.value
            }
            axios
                .put(`/api/person/${id}`, data)
                .then((response) => {
                    this.editing = false
                    this.getJudges(this.n)
                })
                .catch((errors) => {
                    this.showAlert = true
                    console.log(errors)
                })
        },
        removeJudge: function () {
            axios
                .delete(`/api/person/${this.judgeData.id}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    this.editing = false
                    this.getJudges(this.n)
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        previous: function () {
            if (this.n > 1) {
                this.n--
                this.getJudges(this.n)
            }
        },
        next: function () {
            if (this.judges.length === 10) {
                this.n++
                this.getJudges(this.n)
            }
        }
    }
}
</script>
