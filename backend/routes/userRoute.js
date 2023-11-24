const express = require('express')
const { getUsers,
        createUser,
        updateUser,
        deleteUser,
        getUser } = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getUsers)

// Get one user
router.get('/:id', getUser)

// Register user to DB
router.post('/', createUser)

// Update a user
router.patch("/:id", updateUser)

// Delete a user
router.delete('/:id', deleteUser)

module.exports = router;