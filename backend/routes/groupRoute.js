const express = require('express');
const bodyParser = require('body-parser');

const router = express();

const Group = require('../models/groupModel');

router.use(bodyParser.json());

// Create a new chat room
router.post('/createRoom', async (req, res) => {
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
  
module.exports = router;
