///////////////// DEPENDENCIES
const bcrypt = require("bcrypt")
const { application } = require("express")
const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

///////////////// ROUTES
// New (regisration page)
userRouter.get("/new", (req, res)=>{
    res.render("users/new.ejs", {
        currentUser: req.session.currentUser,
    })
})
// Create (registration route)
userRouter.post("/", (req, res)=>{
    // overwrite the user password with the hashed password, then pass that into our DB.
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, newUser)=>{
        res.redirect("/")
    })
    res.render("index.ejs")
})

// Export
module.exports = userRouter