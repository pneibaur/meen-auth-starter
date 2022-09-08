///////////////// DEPENDENCIES
const bcrypt = require("bcrypt")
const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

///////////////// ROUTES
// New (regisration page)
// Create (registration route)
userRouter.post("/", (req, res)=>{
    // overwrite the user password with the hashed password, then pass that into our DB.
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, newUser)=>{
        res.redirect("/")
    })
    res.send(req.body)
})

// Export
module.exports = userRouter