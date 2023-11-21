require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoute")

const app = express();

app.use(express.json());
app.use('/users', userRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Welcome");
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

