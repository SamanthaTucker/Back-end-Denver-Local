const bcrypt = require('bcrypt')
const express = require('express')
const session = express.Router()
const userModel = require('../models/userModel')


// GET Sessions Route ---
session.get('/', (req, res)=>{
    req.session.currentUser?
    res.json({currentUser: req.session.currentUser}):
    res.status(400).json({message: 'No current session active'})
}) 



// POST Create Session Route -----
sessions.post('/', (req, res)=>{
    userModel.findOne({ username: req.body.username}, (error, foundUsers)=>{
        if(error){
            res.status(400).json({message: error.message})
        } 
        else {
            if(foundUsers){
                if(bcrypt.compareSync(req.body.password, foundUsers.password)){
                    req.session.currentUser = foundUsers
                    res.status(200).json({message: 'Successfuly Logged In!' + foundUsers.username, currentUser: req.session.currentUsers})
                } 
                else {
                    res.status(400).json({message: 'Incorrect Password / Incorrect Username!'})
                } 
            }
        }
    })
})

// DELETE session Route ---
session.delete('/', (req, res)=>{
    req.session.destroy(error => {
        if(error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(200).json({message: 'User is logged out'})
        }
    })
})

module.exports = session