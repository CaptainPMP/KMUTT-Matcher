const mongoose = require("mongoose");

const mbtiSchema = mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      unique: true
    },
    Ne: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Ni: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Te: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Ti: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Se: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Si: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Fe: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Fi: {
      type: Number, // Adjust the type as needed
      required: true,
    },
    Type: {
      type: String, // Adjust the type as needed
      required: true,
    },
    Enneagram: {
      type: String, // Adjust the type as needed
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mbti", mbtiSchema);
