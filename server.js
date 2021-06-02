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

// Mongo
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection
mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Database Connection Checked..")
})
db.on('error', (err)=> { console.log('ERROR: ', err)})
db.on('connected', ()=> { console.log("MONGO Connected")})
db.on('disconnected', ()=> { console.log("MONGO Disconnected")})
app.use((req, res, next)=>{
    next()
})


// Controllers ----
app.use('/post', isAuthenticated, require('./controllers/postController'))
app.use('/user', require('./controllers/userController'))


app.listen(PORT, ()=>{
    console.log('Server is listening on port 3003')
})