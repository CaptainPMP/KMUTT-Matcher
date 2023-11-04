const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
    },
    group_description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
