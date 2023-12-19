const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserContact = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Fetch user's contact information from MongoDB
      const userContact = await prisma.socialmedia.findUnique({
        where: { userId: parseInt(userId) }
      });
      // console.log("user contact is", userContact);
      res.status(200).json({ success: true, userContact });
    } catch (error) {
      console.error('Error fetching user contact information:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

module.exports = {getUserContact}