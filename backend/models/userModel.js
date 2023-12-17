const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
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
        },
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
