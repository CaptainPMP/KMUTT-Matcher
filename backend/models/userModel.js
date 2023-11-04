const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        gmail: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: true
        },
        gender: {
            type: String
        },
        birth_date: {
            type: Date
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
