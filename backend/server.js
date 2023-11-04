import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

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
    })


