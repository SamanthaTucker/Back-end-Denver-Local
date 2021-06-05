const mongoose = require('mongoose')
const {Schema, model} = mongoose

const postSchema = new Schema({
    activity: {type: String, required: true},
    location: {type: String, required: true},
    about: {type: String, required: true},
    date: Date
})

module.exports = model('Post', postSchema)