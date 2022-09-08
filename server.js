///////////////////// DEPENDENCIES
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const session = require("express-session")
const methodOverride = require("method-override")
// controller dependencies
const userController = require("./controllers/users.js")
const sessionsController = require("./controllers/sessions.js")

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
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
)
app.use("/sessions", sessionsController)
app.use(methodOverride("_method"))

///////////////////// ROUTES & CONTROLLERS
app.get("/", (req, res)=>{
    if (req.session.currentUser){
        res.render("dashboard.ejs", {
            currentUser: req.session.currentUser,
        })
    } else {
        res.render("index.ejs", {
            currentUser: req.session.currentUser
        })
    }
})

///////////////////// LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))