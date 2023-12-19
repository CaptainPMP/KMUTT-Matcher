const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserDetail = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Fetch user's contact information from MongoDB
      const userDetails = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          socialmedia: {
            select: {
              line: true,
              facebook: true,
              instagram: true,
              phone: true,
            },
          },
        },
      });
      console.log("user contact is", userDetails);
      res.status(200).json({ success: true, userDetails });
    } catch (error) {
      console.error('Error fetching user contact information:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

module.exports = {getUserDetail}