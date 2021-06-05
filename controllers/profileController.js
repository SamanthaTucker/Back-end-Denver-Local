const express = require('express')
const profile = express.Router()
const userModel = require('../models/userModel')

// Profile Route -----
profile.get('/:username', (req, res)=>{
    userModel.findOne({username: req.params.username}, (error, foundProfile)=>{
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).json({data: foundProfile, currentUser: req.session.currentUser})
    })
})

// PUT Edit Profile Route ----
profile.put('/:username', (req, res)=>{
    userModel.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, (error, editProdile)=>{
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).json({data: editProfile, currentUser: req.session.currentUser})
    })
})

module.exports = profile