import prisma from '../../../../lib/prisma/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

// handles replies to a certain saying
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

// GET /api/saying/feed/[id]
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const { id, sort, beforeTime } = req.query;

  try {
    const listOfSayingReplies = await prisma.saying.findMany({
      skip: 10 * parseInt(sort as string),
      take: 10 * (parseInt(sort as string) + 1),
      orderBy: { createdAt: 'desc' },
      include: {
        creator: { select: { username: true } },
      },
      where: {
        repliedToSayingID: { equals: id as string },
        createdAt: {
          lt: (beforeTime as string) ?? new Date().toISOString(),
        },
      },
    });

    return res.status(200).json(listOfSayingReplies);
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to view your feed!',
    });
  }
}
