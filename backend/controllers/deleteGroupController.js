const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteGroup = async (req, res) => {
    const groupId = req.params.groupId;
  
    try {
      // Find and delete associated GroupUser records first
      await prisma.groupUser.deleteMany({
        where: { groupId: groupId },
      });
  
      // Now, you can delete the group
      const deletedGroup = await prisma.group.delete({
        where: { id: groupId },
      });
  
      res.json({ message: 'Group deleted successfully', deletedGroup });
    } catch (error) {
      console.error('Error deleting group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { deleteGroup };
