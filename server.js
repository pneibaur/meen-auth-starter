///////////////////// DEPENDENCIES
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")

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
///////////////////// ROUTES 
app.get("/", (req, res)=>{
    res.send("it's working")
})

///////////////////// LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))