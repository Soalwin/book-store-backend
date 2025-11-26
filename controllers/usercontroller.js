const users = require("../models/userModel")

//import jwt
const jwt = require('jsonwebtoken')


//register
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password)

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Already registered user." })
        }

        const newUser = new users({ username, email, password })
        await newUser.save()
        return res.status(200).json({ message: "User registered", user: newUser })

    } catch (err) {
        return res.status(500).json({ error: err.message || err })
    }
}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log( email, password)

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if(existingUser.password == password){
                   // JWT encryption 
                const token=jwt.sign({userMail:existingUser.email},"secretKey")
                res.status(200).json({existingUser,token})
            }
        }else{
                res.status(401).json("password don't match")
        }

        
    } catch (err) {
        return res.status(500).json({ error: err.message || err })
    }
}