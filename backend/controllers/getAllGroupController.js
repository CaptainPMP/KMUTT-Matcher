const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllGroup = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userGroups = await prisma.groupUser.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
      },
    });

    const groups = userGroups.map((userGroup) => {
      const isAdmin = userGroup.isAdmin; // Assuming there's a field indicating admin status in the GroupUser model
      return {
        ...userGroup.group,
        isAdmin,
      };
    });

    res.json({ groups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllGroup };
