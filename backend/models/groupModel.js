const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    group_name: {
      type: String,
      unique: true,
      required: true,
    },
    group_description: {
      type: String,
      required: true,
    },
    group_host: {
      type: String,
      required: true,
    },
    group_membersName: {
      type: [String], // Ensure that group_membersName is defined as an array of strings
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
