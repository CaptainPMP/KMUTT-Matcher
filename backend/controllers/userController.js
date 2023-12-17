const mongoose = require('mongoose');
const User = require('../models/userModel')
const validator = require('validator');
const bcrypt = require('bcrypt');
const generateToken = require('../config/generateToken');
const asyncHandler = require("express-async-handler");

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
        res.status(500).json({ error: 'Internal server errors' });
    }
}

// Register user to DB
// const createUser = async (req, res) => {
//     const {email, password, full_name, confirm_password, pic} = req.body;
//     const existingUser = await User.findOne({email});

//     let emptyFields = []
//     let errorMessage = []

//     if(!email) {
//         emptyFields.push('email')
//     }
//     if(!password) {
//         emptyFields.push('password')
//     }
//     if(!confirm_password) {
//         emptyFields.push('confirm_password')
//     }
//     if(!full_name) {
//         emptyFields.push('full_name')
//     }
//     if(emptyFields.length > 0){
//         return res.status(400).json({error: "Please fill in all fields", emptyFields})
//     }
//     if(password !== confirm_password){
//         return res.status(400).json({error: "Your password and confirm password not same"})
//     }
//     if (existingUser) {
//         // Email already exists, return an error response
//         errorMessage.push('Email already exists');
//         return res.status(400).json({ error: 'Email already exists' });
//     }
//     if (!validator.isEmail(email)) {
//         errorMessage.push('Invalid email, Please enter a correct email form');
//         return res.status(400).json({ error: 'Invalid email, Please enter a correct email form' });
//     }

//     // Hash the password before saving it to the database
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPassword = await bcrypt.hashSync(password, salt);

//     try {
//         const user = await User.create({email, password: hashedPassword, full_name, pic})
//         res.status(201).json({
//             _id: user._id,
//             email: user.email,
//             full_name: user.full_name,
//             pic: user.pic,
//             token: generateToken(user._id),
//         })
//     } catch (error) {
//         res.status(400).json({err: error.message})
//     }

// }

// const loginUser = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});
//     const full_name = user.full_name
//     let errorMessage = []
//     let emptyFields = []

//     // if no email provided
//     if(!email) {
//         emptyFields.push('email')
//     }

//     // if no password provided
//     if(!password) {
//         emptyFields.push('password')
//     }

//     // if there are empty fields
//     if(emptyFields.length > 0){
//         return res.status(400).json({error: "Please fill in all fields", emptyFields})
//     }

//     // if not email
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ error: 'Invalid email address' });
//     }

//     // if user not found
//     if (!user) {
//         // Email does not exist, return an error response
//         errorMessage.push('Email does not exist');
//         return res.status(400).json({ error: 'Email does not exist' });
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//         // Password does not match, return an error response
//         errorMessage.push('Password does not match');
//         return res.status(400).json({ error: 'Password does not match' });
//     }
//     const payload = {id: user._id, email: user._email, full_name: user._full_name}
//     const token = generateToken(payload)
//     res.cookie("token", token, {httpOnly: true})
//     res.status(201).json({
//         _id: user._id,
//         email: user.email,
//         full_name: user.full_name,
//         pic: user.pic,
//         token: token,
//     })
// }

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


const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or : [
            { full_name: {$regex : req.query.search, $options: "i"}},
            { email: {$regex : req.query.search, $options: "i"}},
        ],
    } : {};
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users);
})

// module.exports = {
//     getUsers,
//     getUser,
//     createUser,
//     loginUser,
//     updateUser,
//     deleteUser,
//     allUsers
// }