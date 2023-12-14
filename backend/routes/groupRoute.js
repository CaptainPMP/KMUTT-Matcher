const express = require("express");
const {
  accessChat,
  fetchGroups,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").post(protect, accessGroup);
// router.route("/").get(protect, fetchGroups);
router.route("/").get(protect, fetchGroups);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
