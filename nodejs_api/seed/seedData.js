const mongoose = require('mongoose')
const http = require('http')

const Class = require('../models/classModel')
const Person = require('../models/personModel')
const Horse = require('../models/horseModel')
const Note = require('../models/noteModel')
const HorseNotes = require('../models/horseNotesModel')

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
            let newPerson = await findOrCreatePerson(judge.sedzia, judge.kraj, 'judge')
            judge._db = newPerson
        }

        for (horse of horses) {
            let newHorse = new Horse({
                name: horse.nazwa,
                country: horse.kraj,
                year: horse.rocznik,
                ointment: horse.masc,
                sex: horse.plec === 'kl.' ? 'f' : 'm'
            })
            newHorse.breeder = await findOrCreatePerson(horse.hodowca.nazwa, horse.hodowca.kraj, 'breeder')
            newHorse.owner = await findOrCreatePerson(horse.wlasciciel.nazwa, horse.wlasciciel.kraj, 'owner')
            newHorse.o = await findOrCreatePerson(horse.rodowod.o.nazwa, horse.rodowod.o.kraj, 'horse')
            newHorse.m = await findOrCreatePerson(horse.rodowod.m.nazwa, horse.rodowod.m.kraj, 'horse')
            newHorse.om = await findOrCreatePerson(horse.rodowod.om.nazwa, horse.rodowod.om.kraj, 'horse')

            await newHorse.save(err => {
                if (err) console.log(err)
            })
            horse._db = newHorse
        }
        let days_diff = 0
        for (clas of classes) {
            days_diff++
            let d = new Date()
            d.setDate(d.getDate() - days_diff)
            let newClass = new Class({
                category: clas.kat,
                pending: false,
                createdAt: d
            })
            newClass.judges = judges.filter(j => clas.komisja.includes(j.id)).map(j => j._db)
            let classHorses = horses.filter(h => h.klasa === clas.numer)
            let horseNotes = []
            for (newClassHorse of classHorses) {
                let newHorseNotes = new HorseNotes()
                newHorseNotes.horse = newClassHorse._db
                let i = 0
                let typeAvg = 0
                let moveAvg = 0
                let sumAvg = 0
                for (note of newClassHorse.wynik.noty) {
                    let judge = judges.find(j => j.id === clas.komisja[i])._db
                    i++
                    let newNote = new Note({
                        type: note.typ,
                        head: note.glowa,
                        clog: note.kloda,
                        legs: note.nogi,
                        move: note.ruch,
                        judge: judge
                    })
                    typeAvg += parseFloat(note.typ)
                    moveAvg += parseFloat(note.ruch)
                    sumAvg += parseFloat(note.glowa) + parseFloat(note.kloda) + parseFloat(note.nogi)
                    await newNote.save(err => {
                        if (err) console.log(err)
                    })
                    newHorseNotes.notes.push(newNote)
                }
                typeAvg /= newClass.judges.length
                moveAvg /= newClass.judges.length
                sumAvg /= newClass.judges.length
                newHorseNotes.typeAvg = roundHalf(typeAvg)
                newHorseNotes.moveAvg = roundHalf(moveAvg)
                newHorseNotes.sumAvg = roundHalf(sumAvg)
                await newHorseNotes.save(err => {
                    if (err) console.log(err)
                })
                horseNotes.push(newHorseNotes)
            }
            let sortedHorseNotes = horseNotes.sort(compareHorses)
            newClass.horses = sortedHorseNotes.map(hn => hn.horse)
            newClass.horseNotes = sortedHorseNotes
            await newClass.save((err) => {
                if (err) console.log(err)
            })
        }
    })
}

const compareHorses = (h2, h1) => {
    if (h1.sumAvg !== h2.sumAvg) {
        return h1.sumAvg - h2.sumAvg
    } else {
        if (h1.typeAvg !== h2.typeAvg) {
            return h1.typeAvg - h2.typeAvg
        } else {
            if (h1.moveAvg !== h2.moveAvg) {
                return h1.moveAvg - h2.moveAvg
            } else {
                return Math.random() - Math.random()
            }
        }
    }
}

const roundHalf = (num) => Math.round(num * 2) / 2

const findOrCreatePerson = async (name, country, type) => {
    return new Promise(resolve => {
        Person.findOne({
                'name': name,
                'country': country,
                'type': type
            },
            (err, person) => {
                if (person) {
                    resolve(person)
                } else {
                    let newPerson = new Person({
                        name,
                        country,
                        type
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
})()