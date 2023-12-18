const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const joinGroup = async (req, res) => {
    console.log("join req is", req);
    const { groupId } = req.body;
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decode.id.id
    console.log("decode", decode);
    try {
        
      // Check if the group exists
      const group = await prisma.group.findUnique({
        where: { id: groupId },
      });
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Check if the user is already a member of the group
      const existingMembership = await prisma.groupUser.findFirst({
        where: {
          groupId: group.id,
          userId: userId,
        },
      });
  
      if (existingMembership) {
        return res.status(400).json({ error: 'User is already a member of the group' });
      }
  
      // Add the user to the group
      const newMembership = await prisma.groupUser.create({
        data: {
          groupId: group.id,
          userId: userId,
        },
      });
  
      res.json({ id: group.id });
    } catch (error) {
      console.error('Error joining group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = {joinGroup}