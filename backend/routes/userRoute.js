const express = require('express')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    console.log("my users is ", users);
    res.status(200).json(users)
})

router.post('/', async (req, res) => {
    const {gmail, password, full_name, confirm_password} = req.body;

    let emptyFields = []

    if(!gmail) {
        emptyFields.push('gmail')
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

    try {
        const user = await User.create({gmail, password, full_name})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({err: error.message})
    }

})

// update a workout
router.patch("/:id", async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user);
})

module.exports = router;