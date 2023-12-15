const express = require('express');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get('/', async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    console.log("my users is ", users);
    res.status(200).json(users)
})

router.post('/register', async (req, res) => {
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
        const encrypt_password = await bcrypt.hashSync(password, 10)
        const user = await User.create({gmail, password: encrypt_password, full_name})
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

//find full name
router.post('/searchFullName', async (req, res) => {
    const { gmail, password } = req.body;

    try {
        // Search for user by gmail and password
        const user = await User.findOne({ gmail, password });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If user is found, send back the full name
        res.status(200).json({ full_name: user.full_name });
    } catch (error) {
        console.error('Error searching for full name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Delete User
router.delete('/deleteUser', async (req, res) => {
    try {
      const { gmail, password } = req.body;
  
      // Check if the user with the provided Gmail and password exists
      const user = await User.findOne({ gmail, password });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Display an alert for confirmation, then proceed with deletion
      const confirm = req.query.confirm;
  
      if (confirm !== 'true') {
        return res.status(200).json({ message: 'Please confirm deletion by providing "?confirm=true" in the query parameter.' });
      }
  
      // Proceed with user deletion
      await user.remove();
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
module.exports = router;