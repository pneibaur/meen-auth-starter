////////////// DEPENDENCIES
const express = require("express")
const bcrypt = require("bcrypt")
const sessionsRouter = express.Router()
const User = require("../models/user.js")

// New (login page)

// Delete (Logout route)
sessionsRouter.delete("/", (req, res)=>{
    req.session.destroy((error)=>{
        res.redirect("/")
    })
})

// Create (login route)
sessionsRouter.post("/", (req, res)=>{
    // checks for existing user
    User.findOne({email: req.body.email}, (error, foundUser)=>{
        // send error msg if no user found
        if (!foundUser) {
            res.send("Oops! No user with that email address.")
        } else {
            // if a user has been found...
            // compare the given pwd with the stored and hashed pwd. 
            const pwdMatch = bcrypt.compareSync(req.body.password, foundUser.password)
            // if the pwds match:
            if (pwdMatch){
                // add the user to our session
                req.session.currentUser = foundUser
                // redirect back to home!
                res.redirect("/")
            } else {
                // if pwds don't match
                res.send("oops! invalid password.")
            }
        }
    }
    )
})

////////////// EXPORT ROUTER
module.exports = sessionsRouter