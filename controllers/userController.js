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

// PUT Edit User Route -----
users.post('/:id', (req, res) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, editUser)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(200).json({message: `${editUser.username} edited Successfully!`, data: editUser})
        }
    })
})


module.exports = users