require("dotenv").config();
const User = require('./models/userModel');
const express = require("express");
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}
));
app.use(express.json());

let refreshTokens = []

app.get('/set-cookie', async(req, res) => {
  const user = {email: "test@gmail.com", password:"asdf"}
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
  refreshTokens.push(refreshToken);


  // const {email, password} = req.body;
  let email = "test@gmail.com"
  let password = "asdf"
  try {
    const existingUser = await User.findOne({email});
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
    if (!existingUser) {
        // Email does not exist, return an error response
        errorMessage.push('Email does not exist');
        return res.status(400).json({ error: 'Email does not exist' });
    }
    if (!existingUser) {
        // Email does not exist, return an error response
        errorMessage.push('Email does not exist');
        return res.status(400).json({ error: 'Email does not exist' });
    }
    if (!bcrypt.compareSync(password, existingUser.password)) {
        // Password does not match, return an error response
        errorMessage.push('Password does not match');
        return res.status(400).json({ error: 'Password does not match' });
    }
    res.status(201).json({ accessToken, refreshToken, user });
    // .json({ accessToken: accessToken, refreshToken: refreshToken, user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
})

app.post("/users/login",async (req, res) => {

  // const username = req.body.username;

  // const {email, password} = req.body;
  try {
        // Auth
    const {email, password} = req.body;
    const user = { email, password };

    const existingUser = await User.findOne({email});
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
    if (!existingUser) {
        // Email does not exist, return an error response
        errorMessage.push('Email does not exist');
        return res.status(400).json({ error: 'Email does not exist' });
    }
    if (!existingUser) {
        // Email does not exist, return an error response
        errorMessage.push('Email does not exist');
        return res.status(400).json({ error: 'Email does not exist' });
    }
    if (!bcrypt.compareSync(password, existingUser.password)) {
        // Password does not match, return an error response
        errorMessage.push('Password does not match');
        return res.status(400).json({ error: 'Password does not match' });
    }
    // generate jwt token for user
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
    refreshTokens.push(refreshToken);

    res.status(201).json({ accessToken, refreshToken, user: existingUser });
    // .json({ accessToken: accessToken, refreshToken: refreshToken, user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
    
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if(refreshToken === null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({name: user.name})
    res.json({accessToken: accessToken})
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})



function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen( 3001, () => {
            console.log(`listening on port 3001`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
