///////////////////// DEPENDENCIES
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const userController = require("./controllers/users.js")

// Database Config
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Error & Success Messages
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

///////////////////// MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use("/users", userController)

///////////////////// ROUTES & CONTROLLERS
// app.get("/", (req, res)=>{
//     res.send("it's working")
// })

///////////////////// LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))