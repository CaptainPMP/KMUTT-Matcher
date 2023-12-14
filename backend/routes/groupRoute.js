const express = require('express');
const bodyParser = require('body-parser');

const router = express();

const Group = require('../models/groupModel');

router.use(bodyParser.json());

// Create a new chat room
router.post('/createGroup', async (req, res) => {
  const { group_name, group_description, group_host, group_membersName } = req.body;

  try {
    // Check if a group with the same name already exists
    const existingGroup = await Group.findOne({ group_name });

    if (existingGroup) {
      return res.status(400).json({ error: 'Group with the same name already exists' });
    }

    const newGroup = new Group({
      group_name,
      group_description,
      group_host,
      group_membersName,
    });

    const savedGroup = await newGroup.save();

    res.status(201).json(savedGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//เช็คว่าอยู่กลุ่มไหนบ้าง
router.get('/groupsByGmail/:gmail', async (req, res) => {
  const { gmail } = req.params;

  try {
    // Find groups where the specified gmail is either the host or a member
    const groups = await Group.find({
      $or: [{ group_host: gmail }, { group_membersName: gmail }],
    }).select('group_name group_description');

    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/joinGroup', async (req, res) => {
  const { group_name, group_membersName } = req.body;

  try {
    const group = await Group.findOne({ group_name });
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!group.group_membersName) {
      group.group_membersName = [];
    }

    if (group.group_host.includes(group_membersName)) {
      return res.status(400).json({ error: 'Email is already a Host of the group' });
    }

    if (group.group_membersName.includes(group_membersName)) {
      return res.status(400).json({ error: 'Email is already a member of the group' });
    }

    group.group_membersName.push(group_membersName);

    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//เช็คว่ามีสมาชิกในกลุ่มคนไหนย้าง
router.get("/groupMembers/:groupName", async (req, res) => {
  const { groupName } = req.params;

  try {
    // Find the group by group name
    const group = await Group.findOne({ group_name: groupName });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Return the group members
    res.status(200).json({ group_membersName: group.group_membersName });
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
