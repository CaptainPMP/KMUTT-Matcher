require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoute")
const auth = require("./routes/auth")
const groupRoute = require("./routes/groupRoute")
const app = express();

app.use(express.json());
app.use('/users', userRoutes)
app.use('/users', auth)
app.use('/users', groupRoute)
app.get("/", (req, res) => {
    res.status(200).send("Welcome Kmuut");
});

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

