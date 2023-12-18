const User = require('../models/userModel');
const generateToken = require('../config/generateToken')
const validator = require('validator');
const { matchPassword } = require('../lib/managePassword');
// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // const user = await User.findOne({email});
        const user = await prisma.user.findUnique({
            where: {
                email: email,
              },
        })
        let errorMessage = []
        let emptyFields = []

        // if no email provided
        if(!email) {
            emptyFields.push('email')
        }

        // if no password provided
        if(!password) {
            emptyFields.push('password')
        }

        // if there are empty fields
        if(emptyFields.length > 0){
            return res.status(400).json({error: "Please fill in all fields", emptyFields})
        }

        // if not email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // if user not found
        if (!user) {
            // Email does not exist, return an error response
            errorMessage.push('Email does not exist');
            return res.status(400).json({ error: 'Email does not exist' });
        }
        if (!matchPassword(password, user.password)) {
            // Password does not match, return an error response
            errorMessage.push('Password does not match');
            return res.status(400).json({ error: 'Password does not match' });
        }
        const payload = {id: user.id, email: user.email, full_name: user.full_name}
        console.log("payload:", payload);
        console.log("payload: ", payload);
        const token = generateToken(payload)
        res.cookie("token", token, {httpOnly: true})
        res.status(201).json({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            pic: user.pic,
            token: token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
    
}

module.exports = login