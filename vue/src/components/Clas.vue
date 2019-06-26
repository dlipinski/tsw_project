<template>
<div class='container pt-5' v-if='clas'>
    <b-row>
        <b-col>
            <h5> Wyniki </h5>
            <b-table striped outlined hover :items='clas.horseNotes' :fields='scoreFields' >
                <template slot="index" slot-scope="data">
                    <strong>{{ data.index + 1 }}</strong>
                </template>
                <template slot="horse" slot-scope="data">
                    <a :href="`#${data.item._id}`">{{ data.item.horse.name }}</a>
                </template>
            </b-table>
        </b-col>
        <b-col>
            <h5> Sędziowie </h5>
            <b-table striped outlined hover :items='clas.judges' :fields='judgesFields' >
            </b-table>
            <h5 class='mt-5'> Dane </h5>
            <b-card>
                <strong>Kategoria: </strong> {{ clas.category }}<br>
                <strong>Data: </strong> {{ clas.createdAt | formatDate}}<br>
            </b-card>
        </b-col>
    </b-row>
    <h5 class='mt-3'> Szczegółowe wyniki </h5>
    <b-card v-for='horseNote in clas.horseNotes' v-bind:key='horseNote._id' class='mb-3' no-body :id='horseNote._id'>
        <b-link href='#' slot="header">{{ horseNote.horse.name }}</b-link>
        <b-table small striped hover :items='horseNote.notes' :fields='exactScoreFields' class='m-0'>
            <template slot="judge" slot-scope="data">
                {{ data.item.judge.name }}
            </template>
            <template slot="sum" slot-scope="data">
                {{ data.item.head + data.item.clog + data.item.legs }}
            </template>
        </b-table>
    </b-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Clas',
    props: ['id'],
    mounted: function () {
        this.getClass()
    },
    data () {
        return {
            clas: null,
            exactScoreFields: [
                { key: 'judge', label: 'Sędzia' },
                { key: 'head', label: 'Głowa' },
                { key: 'clog', label: 'Kłoda' },
                { key: 'legs', label: 'Nogi' },
                { key: 'sum', label: 'Suma' },
                { key: 'type', label: 'Typ' },
                { key: 'move', label: 'Ruch' }
            ],
            scoreFields: [
                { key: 'index', label: 'Miejsce' },
                { key: 'horse', label: 'Koń' },
                { key: 'sumAvg', label: 'Śr. suma' },
                { key: 'typeAvg', label: 'Śr. typ' },
                { key: 'moveAvg', label: 'Śr. ruch' }
            ],
            judgesFields: [
                { key: 'name', label: 'Nazwa' },
                { key: 'country', label: 'Kraj' }
            ]
        }
    },
    methods: {
        getClass: function () {
            axios
                .get(`/api/classClient/${this.id}`, {
                    dataType: 'json',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors',
                    credentials: 'include'
                })
                .then(response => {
                    console.log(response)
                    this.clas = response.data
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
            if (this.classes.length === 5) {
                this.n++
                this.getClasses(this.n)
            }
        }
    }
}
</script>
