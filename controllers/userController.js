const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const userModel = require('../models/userModel')


// GET users -----
users.get('/', (req, res)=>{
    userModel.find({}, (error, foundUsers)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(200).json(foundUsers)
        }
    })
})



// POST Register Route/ NEW User Route ---
users.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.passwprd, bcrypt.genSaltSync(10))
    
    userModel.create(req.body, (error, newUser)=>{
        if(error){
            res.status(400).json({message: 'Username is already Taken', status: 400})
        }
        else{
            res.status(200).json({message: `${newUser.username} created successfully!`, data: newUser})
        }
    })
})

// POST User Login Route -----
users.post('/login', (req, res) => {
    userModel.findOne({ username: req.body.username }, (error, foundUser)=>{
        if(error){
            res.send(error)
        }else{
            if(foundUser){
                if(bcrypt.compareSync(req.body.password, foundUser.password)) {

                    req.session.currentUser = foundUser

                    res.status(200).json(foundUser)
                }else{
                    res.status(404).json({ error: 'User Not Found'})
                }
            } else{
                res.status(400).json({ error: error})
            }
        }
    })
})


module.exports = users