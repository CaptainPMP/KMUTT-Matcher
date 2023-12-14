const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Group = require("../models/groupModel");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessGroup = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Group.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")

//   isChat = await User.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "name pic email",
//   });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      group_name: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchGroups = asyncHandler(async (req, res) => {
  try {
    Group.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .sort({ updatedAt: -1 })
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.group_name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Group.create({
      group_name: req.body.group_name,
      users: users,
    });

    const fullGroupChat = await Group.findOne({ _id: groupChat._id })
      .populate("users", "-password")

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, groupName } = req.body;

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      group_name: groupName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")

  if (!updatedGroup) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedGroup);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;

  // check if the requester is admin

  const removed = await Group.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;

  // check if the requester is admin

  const added = await Group.findByIdAndUpdate(
    groupId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessGroup,
  fetchGroups,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
