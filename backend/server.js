require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require("./routes/userRoute")
const groupRoute = require("./routes/groupRoute")
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true
    }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoute)
app.use('/group', groupRoute)

app.get("/home", (req, res) => {
    // const token = req.cookies.access_token
    // const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // res.status(201).send({decode});
    res.status(200)
});

// app.post("/users/login",async (req, res) => {
//     try {
//       // Auth
//       const {email, password} = req.body;
//       const existingUser = await User.findOne({email});
//       const full_name = existingUser.full_name
//       const user = { email, full_name };
//       let errorMessage = []
//       let emptyFields = []
  
//       // if no email provided
//       if(!email) {
//           emptyFields.push('email')
//       }
  
//       // if no password provided
//       if(!password) {
//           emptyFields.push('password')
//       }
  
//       // if there are empty fields
//       if(emptyFields.length > 0){
//           return res.status(400).json({error: "Please fill in all fields", emptyFields})
//       }
  
//       // if not email
//       if (!validator.isEmail(email)) {
//           return res.status(400).json({ error: 'Invalid email address' });
//       }
  
//       // if user not found
//       if (!existingUser) {
//           // Email does not exist, return an error response
//           errorMessage.push('Email does not exist');
//           return res.status(400).json({ error: 'Email does not exist' });
//       }
//       if (!bcrypt.compareSync(password, existingUser.password)) {
//           // Password does not match, return an error response
//           errorMessage.push('Password does not match');
//           return res.status(400).json({ error: 'Password does not match' });
//       }
//       // generate jwt token for user
//       const accessToken = generateAccessToken(user);
//       res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
//       res.sendStatus(201)
//     } catch (error) {
//       console.error("error: ",error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
      
//   });

// app.post("/users/register",async (req, res) => {
//     try {
//         const {email, password, full_name, confirm_password} = req.body;
//         const existingUser = await User.findOne({email});

//         let emptyFields = []
//         let errorMessage = []

//         if(!email) {
//             emptyFields.push('email')
//         }
//         if(!password) {
//             emptyFields.push('password')
//         }
//         if(!confirm_password) {
//             emptyFields.push('confirm_password')
//         }
//         if(!full_name) {
//             emptyFields.push('full_name')
//         }
//         if(emptyFields.length > 0){
//             return res.status(400).json({error: "Please fill in all fields", emptyFields})
//         }
//         if(password !== confirm_password){
//             return res.status(400).json({error: "Your password and confirm password not same"})
//         }
//         if (existingUser) {
//             // Email already exists, return an error response
//             errorMessage.push('Email already exists');
//             return res.status(400).json({ error: 'Email already exists' });
//         }
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ error: 'Invalid email address' });
//         }

//         // Hash the password before saving it to the database
//         const saltRounds = 10;
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hashedPassword = await bcrypt.hashSync(password, salt);
        
//         const user = await User.create({email, password: hashedPassword, full_name})
//         const new_created_user = {email, full_name};
//         console.log("new created: ",new_created_user);
//         const accessToken = generateAccessToken(new_created_user);
//         res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
//         res.sendStatus(201)
//     } catch (error) {
//         console.error("error: ",error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.post('/users/logout', (req, res) => {
    res.clearCookie('access_token');
    res.sendStatus(200);
  }
)

app.get('/see-cookie', (req, res) => {
    const token = req.cookies
    console.log(token);
    res.send(token);
})

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    console.log("all my cookies: ",req.cookies);
    const token = req.cookies.access_token;
    console.log("token : ", token);
    if(token === null || token === undefined) return res.sendStatus(401)

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403)
    //     req.user = user
    //     next()
    // })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
  }

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });

