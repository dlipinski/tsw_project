const mongoose = require('mongoose')
const http = require('http')

const Class = require('../models/classModel')
const Person = require('../models/personModel')
const Horse = require('../models/horseModel')
const Note = require('../models/noteModel')

const getDataAsync = async type => {
    return new Promise(resolve => {
        let options = {
            host: 'localhost',
            port: 4000,
            path: `/${type}`
        }
        http.get(options, res => {
            let data = ''
            res.on('data', chunk => {
                data += chunk
            })
            res.on('end', () => {
                resolve(JSON.parse(data))
            })
        })
    })
}

const seedData = async () => {
    let horses = await getDataAsync('konie')
    let judges = await getDataAsync('sedziowie')
    let classes = await getDataAsync('klasy')
    console.log(`horses: ${horses.length}, judges: ${judges.length}, classes: ${classes.length}`)
    mongoose.connect('mongodb://localhost:27017/tsw_project', {
        useNewUrlParser: true,
        useFindAndModify: false
    }, async () => {
        mongoose.connection.db.dropDatabase()
        for (judge of judges) {
            let newPerson = new Person({
                name: judge.sedzia,
                country: judge.kraj
            })
            await newPerson.save((err) => {
                if (err) console.log(err)
            })
            judge._db = newPerson
        }

        for (clas of classes) {
            let newClass = new Class({
                category: clas.kat
            })
            newClass.judges = judges.filter(j => clas.komisja.includes(j.id)).map(j => j._db)
            await newClass.save((err) => {
                if (err) console.log(err)
            })
            clas._db = newClass
        }

        for (horse of horses) {
            let newHorse = new Horse({
                name: horse.nazwa,
                country: horse.kraj,
                year: horse.rocznik,
                ointment: horse.masc,
                sex: horse.plec === 'kl.' ? 'f' : 'm'
            })
            newHorse.class = classes.find(c => c.id === horse.klasa)._db
            newHorse.breeder = await findOrCreatePerson(horse.hodowca.nazwa, horse.hodowca.kraj)
            newHorse.owner = await findOrCreatePerson(horse.wlasciciel.nazwa, horse.wlasciciel.kraj)
            newHorse.o = await findOrCreatePerson(horse.rodowod.o.nazwa, horse.rodowod.o.kraj)
            newHorse.m = await findOrCreatePerson(horse.rodowod.m.nazwa, horse.rodowod.m.kraj)
            newHorse.om = await findOrCreatePerson(horse.rodowod.om.nazwa, horse.rodowod.om.kraj)

            for (note of horse.wynik.noty) {
                let newNote = new Note({
                    type: note.typ,
                    head: note.glowa,
                    clog: note.kloda,
                    legs: note.nogi,
                    move: note.ruch
                })
                await newNote.save(err => {
                    if (err) console.log(err)
                })
                newHorse.notes.push(newNote)
            }

            await newHorse.save(err => {
                if (err) console.log(err)
            })
        }

    })
}

const findOrCreatePerson = async (name, country) => {
    return new Promise(resolve => {
        Person.findOne({
                name,
                country
            },
            (err, person) => {
                if (person) {
                    resolve(person)
                } else {
                    let newPerson = new Person({
                        name,
                        country
                    })
                    newPerson.save((err) => {
                        if (err) console.log(err)
                        else resolve(newPerson)
                    })
                }
            }
        )
    })
}

(async function () {
    await seedData()
    console.log('Ctrl + C to close.')
})()