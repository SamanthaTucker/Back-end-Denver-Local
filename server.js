require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const cors = require('cors')
// const session = require('express-session')
const bodyParser = require('body-parser')

// Middleware ------
app.use(express.json())

// Sessions ----
// app.use(session({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// 	uri: 'mongodb://127.0.0.1:27017/denverLocal'
// }))


// CORS ---- 
const whitelist = ['http://localhost:3000']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS!!'))
		}
	},
	// credentials: true,
	// methods: "GET, PUT, POST, DELETE"
}
app.use(cors(corsOptions))

// Active Sessions Validation -----
// const isAuthenticated = (req, res, next) => {
// 	if (req.session.currentUser) {
// 		return next()
// 	}else {
// 		res.status(403).json({msg: 'Login required'})
// 	}
// }

// Mongoose
const url = 'mongodb://127.0.0.1/blogPostsDenver'
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

const db = mongoose.connection
db.once('open', ()=> console.log('Database connected'))
db.on('error', (error)=> console.log(error.message))
db.on('disconnected', ()=> console.log('Mongoose disconnected'))



// Controllers ----
app.use('/blog', require('./controllers/blogController'))
//app.use('/user', require('./controllers/userController'))



app.listen(PORT, ()=>{
    console.log('Server is listening on port 3003')
})