const mongoose = require("mongoose");

const mbtiSchema = mongoose.Schema(
  {
    Ne: {
      type: Number, // Adjust the type as needed
    },
    Ni: {
      type: Number, // Adjust the type as needed
    },
    Te: {
      type: Number, // Adjust the type as needed
    },
    Ti: {
      type: Number, // Adjust the type as needed
    },
    Se: {
      type: Number, // Adjust the type as needed
    },
    Si: {
      type: Number, // Adjust the type as needed
    },
    Fe: {
      type: Number, // Adjust the type as needed
    },
    Fi: {
      type: Number, // Adjust the type as needed
    },
    Type: {
      type: String, // Adjust the type as needed
    },
    Enneagram: {
      type: String, // Adjust the type as needed
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", mbtiSchema);
