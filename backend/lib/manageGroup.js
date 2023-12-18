const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createGroup(groupName, groupDescription, userId) {
  try {
    const group = await prisma.group.create({
        data: {
            group_name: groupName,
            group_description: groupDescription,
            admin_id: userId,
            users: {
              create: [{
                userId,
                isAdmin: true, // Assuming the creator is an admin
              }],
            },
          },
          include: {
            users: true,
          },
    });

    return group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

async function addUserToGroup(userId, groupId) {
  try {
    const userGroup = await prisma.groupUser.create({
      data: {
        userId,
        groupId,
      },
    });

    return userGroup;
  } catch (error) {
    console.error('Error adding user to group:', error);
    throw error;
  }
}

module.exports = {
  createGroup,
  addUserToGroup,
};
