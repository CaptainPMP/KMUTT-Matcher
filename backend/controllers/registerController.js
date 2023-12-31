const User = require("../models/userModel");
const {hashedPassword} = require("../lib/managePassword")
// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const validator = require('validator');
const generateToken = require("../config/generateToken");

const register = async (req, res) => {
    try {
        const {email, password, full_name, confirm_password, pic} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
              },
        })

        let emptyFields = []

        if(!email) {
            emptyFields.push('email')
        }
        if(!password) {
            emptyFields.push('password')
        }
        if(!confirm_password) {
            emptyFields.push('confirm_password')
        }
        if(!full_name) {
            emptyFields.push('full_name')
        }
        if(emptyFields.length > 0){
            return res.status(400).json({error: "Please fill in all fields", emptyFields})
        }
        if(password !== confirm_password){
            return res.status(400).json({error: "Your password and confirm password not same"})
        }
        if (existingUser) {
            // Email already exists, return an error response
            return res.status(400).json({ error: 'Email already exists' });
        }
        if (!validator.isEmail(email)) {
            // If email is not valid, return an error response
            return res.status(400).json({ error: 'Invalid email, Please enter a correct email form' });
        }
        
        const createdUser = {
            email, 
            password: await hashedPassword(password), 
            full_name, 
            pic
        }

        // const user = await User.create(createdUser)
        const user = await prisma.user.create({
            data: createdUser
        })
        const payload = {id: user.id, email: user.email, full_name: user.full_name}
        const token = generateToken(payload)
        res.cookie("token", token, {httpOnly: true})
        res.status(201).json(createdUser)
    } catch (error) {
        console.log(error);
    }
}

module.exports = register;