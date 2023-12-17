const mongoose = require("mongoose");

const socialmediaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, ref:"User",
    },
    line: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Socialmedia", socialmediaSchema);
