const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

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
  
  // Generate JSON Web Token (JWT)
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };
  
module.exports = mongoose.model("User", userSchema);
