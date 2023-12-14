const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
      trim: true,
    },
    // group_description: {
    //   type: String,
    //   required: true,
    // },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
