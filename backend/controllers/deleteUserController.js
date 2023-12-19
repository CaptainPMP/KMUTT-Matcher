const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Use Prisma to find and delete related GroupUser records
      await prisma.groupUser.deleteMany({
        where: {
          userId: parseInt(userId),
        },
      });
  
      // Now, it should be safe to delete the user
      await prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {deleteUser}
  