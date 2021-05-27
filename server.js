require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')

// Sessions ----
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))

// Middleware ------
app.use(express.json())

// CORS ---- 
const whitelist = ['http://localhost:3000']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}
app.use(cors(corsOptions))

// Active Sessions Validation -----
const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next()
	}else {
		res.status(403).json({msg: 'Login required'})
	}
}

// Controllers ----
app.use('/post', require('./controllers/postController'))
app.use('/user', require('./controllers/userController'))


app.listen(PORT, ()=>{
    console.log('Server is listening on port 3003')
})