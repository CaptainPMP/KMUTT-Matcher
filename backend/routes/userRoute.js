const express = require('express')
const { getUsers,
        createUser,
        updateUser,
        deleteUser,
        getUser,
        loginUser, 
        allUsers} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users
router.get('/',protect, allUsers)

// Get one user
router.get('/:id', getUser)

// Register user to DB
router.post('/register', createUser)

// Login user to DB
router.post('/login', loginUser)

// Update a user
router.patch("/:id", updateUser)

// Delete a user
router.delete('/:id', deleteUser)

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token === null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

module.exports = router;