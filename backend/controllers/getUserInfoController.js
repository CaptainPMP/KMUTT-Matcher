const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
    const {userId} = req.params;
  
    try {
      // Fetch user profile data including related models
      const userProfile = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
  
      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }

    res.json({
      userProfile
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserProfile };
