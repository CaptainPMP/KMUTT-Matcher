const mongoose = require('mongoose');
const User = require('../models/userModel')
const validator = require('validator');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    console.log("my users is ", users);
    res.status(200).json(users)
}

// Get one user
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Register user to DB
const createUser = async (req, res) => {
    const {email, password, full_name, confirm_password} = req.body;
    const existingUser = await User.findOne({email});

    let emptyFields = []
    let errorMessage = []

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
        errorMessage.push('Email already exists');
        return res.status(400).json({ error: 'Email already exists' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try {
        const user = await User.create({email, password: hashedPassword, full_name})
        res.status(201).json({user, message: "User registered successfully"})
    } catch (error) {
        res.status(400).json({err: error.message})
    }

}

// Update a user
const updateUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id :id}, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
}

// Delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findOneAndDelete({_id : id})

    if(!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}