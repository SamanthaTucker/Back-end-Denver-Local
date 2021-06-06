const express = require('express')
const blog = express.Router()
const postModel = require('../models/postModel')
const userModel = require('../models/userModel')

// GET Route (Index of posts) -----
blog.get('/', (req, res)=>{
    console.log('Index post working')
    userModel.findById(req.session.currentUser._id).populate('blog').exec((error, foundUser)=>{
        if(error){
            return res.status(400).json(error)
        }
        else{
            console.log(foundUser)
            return res.status(200).json(foundUser.blog)
        }
    })
})

//POST create new Post review
blog.post('/new', (req, res)=>{
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
blog.put('/:id', (req, res)=>{
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
blog.delete('/:id', (req, res)=>{
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

module.exports = blog