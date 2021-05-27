const express = require('express')
const posts = express.Router()
const postModel = require('../models/postModel')
const userModel = require('../models/userModel')

// GET Route (Index of posts) -----
posts.get('/', (req, res)=>{
    console.log('Index posts working')
    userModel.findById(req.session.currentUser._id, (error, foundUser)=>{
        if(error){
            res.status(400).json(error)
        }else {
            res.status(200).json(foundUser.userPosts)
        }
    }).populate('userPosts')
})

//POST create new Post review
posts.post('/new', (req, res)=>{
    console.log(req.session.currentUser)

    postModel.create(req.body, (error, createdPost)=>{
        if(error){
            res.status(400).json({error: error.message})
        }else{
            userModel.findById(req.session.currentUser._id, (error, foundUser)=>{
                if(error){
                    res.status(400).json({error: error.message})
                }else{
                    foundUser.userPosts.push(createdPost)
                    foundUser.save()
                    res.status(201).json(createdPost)
                }
            })
        }
    })
})


// PUT Updating Post -----
posts.put('/:id', (req, res)=>{
    console.log('PUT route working')

    postsModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedPost)=>{
        if(error){
            res.status(400).json({error: error.message})
        }else{
            res.status(200).json({
                message: `Entry ${updatedPost._id} Updated Successfully` ,
                data: updatedPost
            })
            console.log('Update link was hit!', req.body)
        }
    })
})

// DELETE Post Route ------
posts.delete('/:id', (req, res)=>{
    postsModel.findByIdAndDelete(req.params.id, (error, deletedPost)=>{
        if(error){
            res.status(400).json({error: error.message})
        }else if(deletedPost === null){
            res.status(404).json({message: 'Entry not found'})
        }else{
            res.status(200).json({message: `Entry ${deletedPost.restName} Deleted Successfully`})
        }
    })
})

module.exports = posts