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
  const { id } = req.query;

  try {
    const listOfAllFollowers = await prisma.follows.findMany({
      where: { followerId: id as string },
    });

    // if they are not following anyone, just return the latest sayings from the whole site
    // TODO: Add lazy scrolling support
    if (listOfAllFollowers.length == 0) {
      const latestSayings = await prisma.saying.findMany({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      // console.log(latestSayings);
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
