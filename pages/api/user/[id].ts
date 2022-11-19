import prisma from '../../../lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await handleGET(res, req);
      break;
    case 'DELETE':
      await handleDELETE(res, req);
      break;
    default:
      res.setHeader('Allow', ['POST, DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/user/[id]
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (user === null) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const { username, firstName, lastName, aboutMe, location, joinDate } = user;
    return res
      .status(200)
      .json({ username, firstName, lastName, aboutMe, location, joinDate });
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to retrieve this user!',
    });
  }
}

// DELETE /api/user/[id]
// TODO: Fix to ID, only temporarily username for testing
async function handleDELETE(res: NextApiResponse, req: NextApiRequest) {
  // TODO: Add a way to make any user not be able to delete users.
  const { id } = req.query;
  try {
    // there is no delete if not there
    const user = await prisma.user
      .delete({
        where: { username: id as string },
      })
      .catch();

    return res.status(200).json({ message: `${id} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while trying to delete this user!',
    });
  }
}
