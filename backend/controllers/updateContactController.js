const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateContact = async (req, res) => {
    const { userId } = req.params;
    const { line, facebook, instagram, phone } = req.body;

    try {
      // Update the user's contact information in the database
      const updatedContact = await prisma.socialmedia.upsert({
        where: { id: parseInt(userId) },
        update: {
          line,
          facebook,
          instagram,
          phone,
        },
        create: {
          userId: parseInt(userId),
          line,
          facebook,
          instagram,
          phone,
        },
      });
  
      res.status(200).json({ success: true, updatedContact });
    } catch (error) {
      console.error('Error updating user contact information:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  module.exports = {updateContact}