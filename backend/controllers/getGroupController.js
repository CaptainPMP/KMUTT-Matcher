const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getGroupById = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        const groupDetails = await prisma.group.findUnique({
            where: { id: parseInt(groupId) },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (groupDetails) {
            const groupWithUsers = {
                ...groupDetails,
                users: groupDetails.users.map((groupUser) => ({
                    ...groupUser.user,
                    isAdmin: groupUser.isAdmin,
                })),
                admin_id: groupDetails.admin_id,
            };

            res.json(groupWithUsers);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getGroupById };
