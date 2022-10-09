import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { isAuthenticated } from '../../../lib/authentication';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  if (!isAuthenticated(res, token!)) {
    return res.status(401).json({ message: 'You are not logged in!' });
  }

  switch (req.method) {
    case 'POST':
      await handlePOST(res, req, token!);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST /api/saying
async function handlePOST(
  res: NextApiResponse,
  req: NextApiRequest,
  token: JWT
) {
  const { repliedToSayingID, text } = req.body;

  try {
    const saying = await prisma.saying.create({
      data: {
        creatorID: token.id,
        repliedToSayingID,
        text,
      },
    });

    return res.status(200).json({
      id: saying.id,
      creatorID: token.id,
      repliedToSayingID,
      text,
      time: Date(),
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Failed to create saying.' });
  }
}
