import prisma from '../../../../lib/prisma/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await handleGET(res, req);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/user/sayings/[id]
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const { id, sort } = req.query;

  try {
    const sayings = await prisma.saying.findMany({
      where: { creatorID: id as string },
      skip: 10 * parseInt(sort as string),
      take: 10 * (parseInt(sort as string) + 1),
      orderBy: { createdAt: 'desc' },
      include: {
        creator: { select: { username: true } },
        repliedToSaying: {
          include: { creator: { select: { username: true } } },
        },
      },
    });

    if (sayings === null) {
      return res.status(404).json({ message: 'No sayings were found!' });
    }

    return res.status(200).json(sayings);
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to retrieve this user!',
    });
  }
}
