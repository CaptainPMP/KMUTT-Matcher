const {createGroup, addUserToGroup} = require("../lib/manageGroup")

const handleCreateGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, userId } = req.body;
    
        if (!groupName ) {
            return res.status(400).json({ error: 'Missing required group name.' });
        }
        if (!groupDescription) {
            return res.status(400).json({ error: 'Missing required group description.' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'Missing required user id.' });
        }
    
        const group = await createGroup(groupName, groupDescription, userId);
    
        res.status(201).json(group);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
  }

const handleAddUserToGroup = async (req, res) => {
    try {
      const { userId, groupId } = req.body;
  
      if (!userId || !groupId) {
        return res.status(400).json({ error: 'Missing required parameters.' });
      }
  
      const userGroup = await addUserToGroup(userId, groupId);
  
      res.status(201).json(userGroup);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  module.exports = {handleAddUserToGroup, handleCreateGroup}