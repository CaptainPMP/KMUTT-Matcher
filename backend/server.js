require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const userRoute = require("./routes/userRoute");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const login = require('./controllers/loginController');
const register = require('./controllers/registerController');
const checkToken = require('./controllers/checkTokenController');
const logout = require('./controllers/logoutController');
const { handleAddUserToGroup, handleCreateGroup } = require('./controllers/groupController');
const { getGroupById } = require('./controllers/getGroupController');
const { getAllGroup } = require('./controllers/getAllGroupController');
const joinGroup = require('./controllers/joinGroupController');

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
// app.use('/users', userRoute)

app.get('/api/checkToken', checkToken)

app.post('/api/login', login)
app.post('/api/register', register)
app.get('/api/logout', logout)
app.post('/api/createGroup', handleCreateGroup)
app.get('/api/group/:groupId', getGroupById)
app.get('/api/user/:userId/groups', getAllGroup)
app.post('/api/joinGroup', joinGroup)

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

