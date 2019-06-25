const mongoose = require('mongoose')
const bCrypt = require('bcrypt-nodejs')

const User = require('../models/userModel')

mongoose.connect('mongodb://localhost:27017/tsw_project', {
    useNewUrlParser: true,
    useFindAndModify: false
}, () => {
    User.remove({})

    let newUser = new User({
        username: 'admin',
        password: bCrypt.hashSync('admin', bCrypt.genSaltSync(10), null)
    })
    newUser.save((err) => {
        if (err) console.log(err)
        console.log('User seeded\nCtrl + c to exit')
    })
})