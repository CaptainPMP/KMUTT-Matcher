const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const removeUser = async (req, res) => {
    const { groupId, userId } = req.params;
    const requestingUserId = req.body.userId; // Assuming userId is in the request body
  
    try {
      // Check if the user making the request is the admin of the group
      const isAdmin = await prisma.groupUser.findFirst({
        where: {
          groupId,
          userId: requestingUserId, // Check the requesting user's ID
          isAdmin: true,
        },
      });
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'You do not have permission to delete users from this group.' });
      }
  
      // Remove the user from the group
      await prisma.groupUser.deleteMany({
        where: {
          groupId: groupId,
          userId: userId,
        },
      });
      
  
      res.json({ message: `User ${userId} deleted from the group successfully.` });
    } catch (error) {
      console.error('Error deleting user from group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = {removeUser}