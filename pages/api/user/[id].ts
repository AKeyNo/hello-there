import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

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
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/user/[id]
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;

  try {
    const user: any = await prisma.user.findUnique({
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
async function handleDELETE(res: NextApiResponse, req: NextApiRequest) {
  // TODO: Add a way to make any user not be able to delete users.
  const { id } = req.query;

  try {
    const user = await prisma.user.delete({
      where: { id: id as string },
    });

    if (user === null) {
      return res.status(404).json({ message: 'User not found!' });
    }
    return res.status(200).json({ message: `${id} has been deleted.` });
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to delete this user!',
    });
  }
}
