const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/userModel')

// NEW Route -----
sessions.get('/new', (req, res)=>{
    res.send(console.log('New Session'))
})

// POST Login Route ---
sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username}, (err, foundUser)=>{
        if(error){
            res.send(error)
        } else if (!foundUser){
            res.send(console.log('User Not Found'))
        } else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUserres.send(console.log('User Found!'))
            } else {
                res.send(console.log("password doesn't match"))
            }
        }
    })
})

// DELETE session Route ---
sessions.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.send(console.log('Session Ended'))
    })
})

module.exports = sessions