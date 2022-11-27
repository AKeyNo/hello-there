import prisma from '../../../lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { isOriginalCreator } from '../../../lib/authentication';

const secret = process.env.NEXTAUTH_SECRET;

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
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/saying/[id]
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;

  try {
    const saying = await prisma.saying.findUnique({
      where: { id: id as string },
      include: {
        creator: { select: { username: true } },
        // include repliedToSaying
        repliedToSaying: {
          include: { creator: { select: { username: true } } },
        },
      },
    });

    return res.status(200).json({ saying });
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to view this saying!',
    });
  }
}

// DELETE /api/saying/[id]
async function handleDELETE(res: NextApiResponse, req: NextApiRequest) {
  const { id } = req.query;
  const token = await getToken({ req, secret });

  try {
    const checkUserQuery = await prisma.saying.findUnique({
      where: { id: id as string },
    });
    if (!isOriginalCreator(res, token!, checkUserQuery!.creatorID as string))
      return res
        .status(401)
        .json({ message: 'You are not the original creator!' });

    const deleteSayingQuery = await prisma.saying.delete({
      where: { id: id as string },
    });

    if (deleteSayingQuery === null) {
      return res.status(404).json({ message: 'Saying not found!' });
    }

    return res.status(200).json({ message: `${id} has been deleted.` });
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to delete this saying!',
    });
  }
}
