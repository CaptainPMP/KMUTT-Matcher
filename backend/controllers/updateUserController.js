const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          full_name: req.body.full_name,
          email: req.body.email,
          gender: req.body.gender,
          description: req.body.description,
        },
      });
  
      res.json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = {updateUser}