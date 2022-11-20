import prisma from '../../../../lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

// id is the user id to retrieve their latest sayings in their feed
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
    const listOfAllFollowers = await prisma.follows.findMany({
      where: { followerId: id as string },
    });

    // if they are not following anyone, just return the latest sayings from the whole site
    // depending on how far down they scrolled, show 10 sayings since the time requested
    if (listOfAllFollowers.length == 0) {
      const latestSayings = await prisma.saying.findMany({
        skip: 10 * parseInt(sort as string),
        take: 10 * (parseInt(sort as string) + 1),
        orderBy: { createdAt: 'desc' },
        include: {
          creator: { select: { username: true } },
        },
        where: {
          createdAt: {
            lt: beforeTime as string,
          },
        },
      });

      return res.status(200).json(latestSayings);
    }

    const followerIDs = listOfAllFollowers.map((follower) => {
      return follower.followingId;
    });

    const latestSayingsFromFollowing = await prisma.saying.findMany({
      where: { creatorID: { in: followerIDs } },
    });
    return res.status(200).json(latestSayingsFromFollowing);
  } catch {
    return res.status(500).json({
      message: 'An error occurred while trying to view your feed!',
    });
  }
}
